import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';

@Component({
  selector: 'app-edita-tu-perfil-desktop',
  templateUrl: './edita-tu-perfil-desktop.component.html',
  styleUrls: ['./edita-tu-perfil-desktop.component.css']
})
export class EditaTuPerfilDesktopComponent implements OnInit {

  @Input()
  modoDetalleEditPerfilDesktop$: Subject<PerfilBasico>;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  perfilActualizado: EventEmitter<any> = new EventEmitter<any>();

  perfilBasico: PerfilBasico;
  formGroup: FormGroup;
  guardando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private perfilService: PerfilesService
  ) { }

  ngOnInit() {
    this.modoDetalleEditPerfilDesktop$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
        this.inicializarFormulario();
      }
    );
  }

  /**
   * Inicia el formulario
   */
  inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      nombre: [this.perfilBasico.informacionPersonal.nombre],
      email: [this.perfilBasico.informacionPersonal.email],
      id: [this.perfilBasico.informacionPersonal.id]
    });
  }

  /**
   * Cierra el detalle
   */
  cerrar() {
    this.salir.next();
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de actualizar los datos del perfil
   */
  guardar() {
    if (this.guardando == false) {
      this.guardando = true;

      let perfil: PerfilBasico = {
        informacionPersonal: this.formGroup.getRawValue()
      }

      perfil.informacionPersonal.avatar = this.perfilBasico.informacionPersonal.avatar;
      perfil.informacionPersonal.unidadMedidaPeso = this.perfilBasico.informacionPersonal.unidadMedidaPeso;

      this.perfilService.actualizarDatosPersonales(perfil).subscribe(
        respuesta => {
          this.guardando = false;
          this.openSnackBar(respuesta.mensaje);

          if (respuesta.exito == true) {
            this.perfilActualizado.emit();
            this.cerrar();
          }
        },
        error => {
          console.log(error);

          this.guardando = false;
        }
      );
    }
  }
}
