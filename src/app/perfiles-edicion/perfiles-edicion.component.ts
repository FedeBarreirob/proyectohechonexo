import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilesService } from '../services/perfiles/perfiles.service';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';
import { PerfilBasicoCredencial } from '../interfaces/perfiles/perfil-basico-credencial';
import { PerfilBasicoInfoPersonal } from '../interfaces/perfiles/perfil-basico-informacion-personal';
import { Rol } from '../interfaces/security/rol';
import { AuthenticationService } from '../services/security/authentication.service';
import { UserAuth } from '../models/security/user';

@Component({
  selector: 'app-perfiles-edicion',
  templateUrl: './perfiles-edicion.component.html',
  styleUrls: ['./perfiles-edicion.component.css']
})
export class PerfilesEdicionComponent implements OnInit {

  private formSubmitAttempt: boolean;
  public guardando: boolean = false;
  private usuarioLogueado: UserAuth;

  public formDatosAccesoGroup: FormGroup;
  public formDatosPersonalesGroup: FormGroup;
  public formCuentasVinculadasGroup: FormGroup;

  public esRegistroNuevo: boolean;
  public titulo: string;

  public listadoCodigos: string[] = [];
  public roles: Array<Rol> = [
    {
      id: 1,
      denominacion: "Administrador",
      admin: true
    },
    {
      id: 2,
      denominacion: "Productor",
      admin: false
    }];

  public perfilBasico: PerfilBasico;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private perfilService: PerfilesService,
    private dialogRef: MatDialogRef<PerfilesEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PerfilBasico
  ) {
    this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
  }

  ngOnInit() {
    // determinar si es un registro nuevo o una actualizacion de perfil
    this.esRegistroNuevo = this.data == null ? true : false;
    this.titulo = this.esRegistroNuevo ? "Nuevo perfil" : "Ver/Editar perfil";

    // credenciales
    if (this.data != null) {
      this.formDatosAccesoGroup = this.formBuilder.group(this.data.credencial);
      this.formDatosAccesoGroup.addControl('rol', new FormControl(this.roles.filter(x => x.id == (this.data.rol != null ? this.data.rol.id : null))[0]));
    } else {
      this.formDatosAccesoGroup = this.formBuilder.group({
        username: [''],
        password: [''],
        passwordConfirmacion: [''],
        rol: [null]
      });
    }

    // informacion personal
    if (this.data != null) {
      this.formDatosPersonalesGroup = this.formBuilder.group(this.data.informacionPersonal);
    } else {
      this.formDatosPersonalesGroup = this.formBuilder.group({
        nombre: [''],
        domicilio: [''],
        telefonos: [''],
        email: [''],
        cuit: [''],
        cbu: [''],
      });
    }

    // cuentas vinculadas
    this.formCuentasVinculadasGroup = this.formBuilder.group({
      entidadCodigo: [''],
    });
    if (this.data != null && this.data.entidadCodigos != null) {
      this.listadoCodigos = Object.assign([], this.data.entidadCodigos);
    }
  }

  // funcion encargada de enviar los datos para su persistencia
  guardar() {
    if (!this.guardando) {
      this.guardando = true;

      let datosAcceso: PerfilBasicoCredencial = this.formDatosAccesoGroup.getRawValue();
      let informacionPersonal: PerfilBasicoInfoPersonal = this.formDatosPersonalesGroup.getRawValue();
      let rol: Rol = this.formDatosAccesoGroup.value.rol;

      this.perfilBasico = {
        credencial: datosAcceso,
        informacionPersonal: informacionPersonal,
        entidadCodigos: this.listadoCodigos,
        rol: rol
      };

      if (this.esRegistroNuevo) {
        this.guardarNuevo();
      } else {
        this.guardarModificar();
      }
    } else {
      this.openSnackBar("Existe un proceso de registro ejecutándose.", "Registro/Actualización del perfil");
    }
  }

  // funcion encargada de guardar un nuevo perfil
  guardarNuevo() {
    this.perfilService.registrarNuevo(this.perfilBasico, this.usuarioLogueado.token)
      .subscribe(respuesta => {

        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje, "Registro del perfil");
        } else {
          this.openSnackBar(respuesta.mensaje, "Registro del perfil");
          this.dialogRef.close();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar registrar el perfil", "Registro del perfil");
        console.log(error);
      });
  }

  // funcion encargada de actualizar un perfil
  guardarModificar() {
    this.perfilService.actualizar(this.perfilBasico, this.usuarioLogueado.token)
      .subscribe(respuesta => {

        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje, "Actualización del perfil");
        } else {
          this.openSnackBar(respuesta.mensaje, "Actualización del perfil");
          this.dialogRef.close();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar actualizar el perfil", "Actualización del perfil");
        console.log(error);
      });
  }

  isCuentasVinculadasFieldInvalid(field: string) {
    return (
      (!this.formCuentasVinculadasGroup.get(field).valid && this.formCuentasVinculadasGroup.get(field).touched) ||
      (this.formCuentasVinculadasGroup.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // funcion que agrega una cuenta al listado de cuentas a vincular
  agregarCuenta() {
    if (this.formCuentasVinculadasGroup.valid) {
      const index: number = this.listadoCodigos.indexOf(this.formCuentasVinculadasGroup.value.entidadCodigo);
      if (index == -1) {
        this.listadoCodigos.unshift(this.formCuentasVinculadasGroup.value.entidadCodigo);
        this.formCuentasVinculadasGroup.reset();
      } else {
        this.openSnackBar("La cuenta se encuentra en el listado", "Vinculación de cuentas");
      }
    } else {
      this.openSnackBar("Indique la cuenta", "Vinculación de cuentas");
    }
  }

  // funcion encargada de quitar una cuenta del listado
  quitarCuenta(codigo: string) {
    try {
      const index: number = this.listadoCodigos.indexOf(codigo);
      if (index !== -1) {
        this.listadoCodigos.splice(index, 1);
      }
    } catch (e) {
      console.log(e);
      this.openSnackBar("Error al desvincular la cuenta", "Vinculación de cuentas");
    }
  }

  // abre una notificacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
