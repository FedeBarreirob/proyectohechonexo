import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { PerfilesService } from '../services/perfiles/perfiles.service';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';
import { PerfilBasicoCredencial } from '../interfaces/perfiles/perfil-basico-credencial';
import { PerfilBasicoInfoPersonal } from '../interfaces/perfiles/perfil-basico-informacion-personal';
import { Rol } from '../interfaces/security/rol';

@Component({
  selector: 'app-perfiles-edicion',
  templateUrl: './perfiles-edicion.component.html',
  styleUrls: ['./perfiles-edicion.component.css']
})
export class PerfilesEdicionComponent implements OnInit {

  private formSubmitAttempt: boolean;
  private guardando: boolean = false;

  public formDatosAccesoGroup: FormGroup;
  public formDatosPersonalesGroup: FormGroup;
  public formCuentasVinculadasGroup: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private perfilService: PerfilesService,
    private dialogRef: MatDialogRef<PerfilesEdicionComponent>
  ) { }

  ngOnInit() {
    this.formDatosAccesoGroup = this.formBuilder.group({
      username: [''],
      password: [''],
      passwordConfirmacion: [''],
      rol: [null]
    });

    this.formDatosPersonalesGroup = this.formBuilder.group({
      nombre: [''],
      domicilio: [''],
      telefonos: [''],
      email: [''],
      cuit: [''],
      cbu: [''],
    });

    this.formCuentasVinculadasGroup = this.formBuilder.group({
      entidadCodigo: [''],
    });
  }

  guardar() {
    if (!this.guardando) {
      this.guardando = true;

      let datosAcceso: PerfilBasicoCredencial = this.formDatosAccesoGroup.getRawValue();
      let informacionPersonal: PerfilBasicoInfoPersonal = this.formDatosPersonalesGroup.getRawValue();
      let rol: Rol = this.formDatosAccesoGroup.value.rol;

      let perfilBasico: PerfilBasico = {
        credencial: datosAcceso,
        informacionPersonal: informacionPersonal,
        entidadCodigos: this.listadoCodigos,
        rol: rol
      };

      console.log(perfilBasico);

      this.perfilService.registrarNuevo(perfilBasico)
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
    } else {
      this.openSnackBar("Existe un proceso de registro ejecutándose.", "Registro del perfil");
    }
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
