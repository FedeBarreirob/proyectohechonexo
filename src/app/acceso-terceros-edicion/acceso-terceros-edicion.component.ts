import { Component, OnInit, Inject } from '@angular/core';
import { UserAuth } from '../models/security/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TerceroBasico } from '../interfaces/acceso-terceros/tercero-basico';
import { AuthenticationService } from '../services/security/authentication.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TercerosService } from '../services/acceso-terceros/terceros.service';
import { TerceroBasicoCredencial } from '../interfaces/acceso-terceros/tercero-credencial';

@Component({
  selector: 'app-acceso-terceros-edicion',
  templateUrl: './acceso-terceros-edicion.component.html',
  styleUrls: ['./acceso-terceros-edicion.component.css']
})
export class AccesoTercerosEdicionComponent implements OnInit {

  private formSubmitAttempt: boolean;
  private guardando: boolean = false;
  private usuarioLogueado: UserAuth;

  private formDatosAccesoGroup: FormGroup;
  private formDatosTerceroGroup: FormGroup;

  private esRegistroNuevo: boolean;
  private titulo: string;

  private terceroBasico: TerceroBasico;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private terceroService: TercerosService,
    private dialogRef: MatDialogRef<AccesoTercerosEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TerceroBasico
  ) {
    this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
  }

  ngOnInit() {
    // determinar si es un registro nuevo o una actualizacion de acceso a tercero
    this.esRegistroNuevo = this.data == null ? true : false;
    this.titulo = this.esRegistroNuevo ? "Nuevo acceso a tercero" : "Ver/Editar acceso a tercero";

    // credenciales
    if (this.data != null) {
      this.formDatosAccesoGroup = this.formBuilder.group(this.data.credencial);
    } else {
      this.formDatosAccesoGroup = this.formBuilder.group({
        username: [''],
        password: [''],
        passwordConfirmacion: ['']
      });
    }

    // informacion adicional del acceso
    if (this.data != null) {
      this.formDatosTerceroGroup = this.formBuilder.group(this.data);
    } else {
      this.formDatosTerceroGroup = this.formBuilder.group({
        id: [null],
        descripcion: ['']
      });
    }
  }

  // funcion encargada de enviar los datos para su persistencia
  guardar() {
    if (!this.guardando) {
      this.guardando = true;

      let datosAcceso: TerceroBasicoCredencial = this.formDatosAccesoGroup.getRawValue();
      let informacionAdicional: TerceroBasico = this.formDatosTerceroGroup.getRawValue();

      this.terceroBasico = {
        id: informacionAdicional.id,
        credencial: datosAcceso,
        perfilId: this.authenticationService.perfilUsuarioLogueado().informacionPersonal.id,
        descripcion: informacionAdicional.descripcion
      };

      if (this.esRegistroNuevo) {
        this.guardarNuevo();
      } else {
        this.guardarModificar();
      }
    } else {
      this.openSnackBar("Existe un proceso de registro ejecutándose.", "Registro/Actualización de acceso a terceros");
    }
  }

  // funcion encargada de guardar un nuevo acceso a terceros
  guardarNuevo() {
    this.terceroService.registrarNuevo(this.terceroBasico, this.usuarioLogueado.token)
      .subscribe(respuesta => {

        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje, "Registro del acceso a terceros");
        } else {
          this.openSnackBar(respuesta.mensaje, "Registro del acceso a terceros");
          this.dialogRef.close();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar registrar el acceso a terceros", "Registro del acceso a terceros");
        console.log(error);
      });
  }

  // funcion encargada de actualizar un acceso a terceros
  guardarModificar() {
    this.terceroService.actualizar(this.terceroBasico, this.usuarioLogueado.token)
      .subscribe(respuesta => {

        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje, "Actualización del acceso a terceros");
        } else {
          this.openSnackBar(respuesta.mensaje, "Actualización del acceso a terceros");
          this.dialogRef.close();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar actualizar el acceso a terceros", "Actualización del acceso a terceros");
        console.log(error);
      });
  }

  // abre una notificacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
