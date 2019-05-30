import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { NuevoPassword } from '../../../interfaces/security/nuevo-password';

@Component({
  selector: 'app-info-perfil-cambio-password',
  templateUrl: './info-perfil-cambio-password.component.html',
  styleUrls: ['./info-perfil-cambio-password.component.css']
})
export class InfoPerfilCambioPasswordComponent implements OnInit {

  guardando: boolean = false;
  guardando$: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InfoPerfilCambioPasswordComponent>
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      passwordActual: [''],
      password: [''],
      passwordConfirmacion: ['']
    });
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
	 * Cierra el modal sin efectuar cambios
	 */
  salir() {
    this.dialogRef.close();
  }

  /**
   * Actualiza la contraseña
   */
  guardar() {
    if (this.guardando == false) {

      this.guardando = true;
      this.guardando$.next(true);

      let nuevoPassword: NuevoPassword = this.formGroup.getRawValue();
      this.authenticationService.cambiarPassword(nuevoPassword).subscribe(
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
