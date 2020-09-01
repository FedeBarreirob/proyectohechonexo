import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';

@Component({
  selector: 'app-info-perfil-edicion',
  templateUrl: './info-perfil-edicion.component.html',
  styleUrls: ['./info-perfil-edicion.component.css']
})
export class InfoPerfilEdicionComponent implements OnInit {

  avatar: string;
  guardando: boolean = false;
  guardando$: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InfoPerfilEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PerfilBasico,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private perfilService: PerfilesService
  ) { }

  ngOnInit() {
    this.avatar = this.data.informacionPersonal.avatar;

    this.formGroup = this.formBuilder.group({
      nombre: [this.data.informacionPersonal.nombre],
      email: [this.data.informacionPersonal.email],
      id: [this.data.informacionPersonal.id]
    });
  }

  /**
	 * Cierra el modal sin efectuar cambios
	 */
  salir() {
    this.dialogRef.close();
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
      this.guardando$.next(true);

      let perfil: PerfilBasico = {
        informacionPersonal: this.formGroup.getRawValue()
      }

      perfil.informacionPersonal.avatar = this.avatar;
      perfil.informacionPersonal.unidadMedidaPeso = this.data.informacionPersonal.unidadMedidaPeso;

      this.perfilService.actualizarDatosPersonales(perfil).subscribe(
        respuesta => {
          this.guardando = false;
          this.guardando$.next(false);
          this.openSnackBar(respuesta.mensaje);

          if (respuesta.exito == true) {
            this.salir();
          }
        },
        error => {
          console.log(error);

          this.guardando = false;
          this.guardando$.next(false);
        }
      );
    }
  }
}
