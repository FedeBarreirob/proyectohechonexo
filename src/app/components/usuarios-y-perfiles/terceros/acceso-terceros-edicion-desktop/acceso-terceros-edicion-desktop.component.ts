import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { TerceroBasicoCredencial } from '../../../../interfaces/acceso-terceros/tercero-credencial';

@Component({
  selector: 'app-acceso-terceros-edicion-desktop',
  templateUrl: './acceso-terceros-edicion-desktop.component.html',
  styleUrls: ['./acceso-terceros-edicion-desktop.component.css']
})
export class AccesoTercerosEdicionDesktopComponent implements OnInit {

  @Input()
  modoDetalleEditTerceroDesktop$: Subject<TerceroBasico>;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  guardando: boolean = false;
  terceroBasico: TerceroBasico;
  esRegistroNuevo: boolean;
  formGroup: FormGroup;

  // subtipos para los perfiles
  subtiposTerceros: Array<string> = ['CONTADOR', 'COLABORADOR', 'OTRO'];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private terceroService: TercerosService
  ) { }

  ngOnInit() {
    this.modoDetalleEditTerceroDesktop$.subscribe(
      tercero => {
        this.esRegistroNuevo = tercero == null ? true : false;
        this.inicializarFormulario(tercero);
      }
    );
  }

  /**
   * Cierra el detalle
   */
  cerrar() {
    this.salir.next();
  }

  /**
   * Inicia el formulario
   */
  inicializarFormulario(tercero: TerceroBasico) {
    if (tercero != null) {
      this.formGroup = this.formBuilder.group({
        username: [tercero.credencial.username],
        password: [''],
        passwordConfirmacion: [''],
        subtipo: [this.subtiposTerceros.filter(x => x === (tercero.subtipo != null ? tercero.subtipo : null))[0]],
        id: [tercero.id],
        descripcion: [tercero.descripcion]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        username: [''],
        password: [''],
        passwordConfirmacion: [''],
        subtipo: [null],
        id: [null],
        descripcion: ['']
      });
    }
  }

  /**
   * abre una notificación
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de enviar los datos para su persistencia
   */
  guardar() {
    if (!this.guardando) {
      this.guardando = true;

      let datosAcceso: TerceroBasicoCredencial = this.formGroup.getRawValue();
      let informacionAdicional: TerceroBasico = this.formGroup.getRawValue();
      let subtipo: string = this.formGroup.value.subtipo;

      this.terceroBasico = {
        id: informacionAdicional.id,
        credencial: datosAcceso,
        perfilId: this.authenticationService.perfilUsuarioLogueado().informacionPersonal.id,
        descripcion: informacionAdicional.descripcion,
        subtipo: subtipo
      };

      if (this.esRegistroNuevo) {
        this.guardarNuevo();
      } else {
        this.guardarModificar();
      }
    } else {
      this.openSnackBar("Existe un proceso de registro ejecutándose.");
    }
  }

  /**
   * Función encargada de guardar un nuevo acceso a terceros
   */
  guardarNuevo() {
    this.terceroService.registrarNuevo(this.terceroBasico)
      .subscribe(respuesta => {
        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje);
        } else {
          this.openSnackBar(respuesta.mensaje);
          this.cerrar();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar registrar el acceso a terceros");
        console.log(error);
      });
  }

  // Función encargada de actualizar un acceso a terceros
  guardarModificar() {
    this.terceroService.actualizar(this.terceroBasico)
      .subscribe(respuesta => {

        this.guardando = false;

        if (respuesta && respuesta.exito == false) {
          this.openSnackBar(respuesta.mensaje);
        } else {
          this.openSnackBar(respuesta.mensaje);
          this.cerrar();
        }

      }, error => {
        this.guardando = false;

        this.openSnackBar("Error al intentar actualizar el acceso a terceros");
        console.log(error);
      });
  }
}
