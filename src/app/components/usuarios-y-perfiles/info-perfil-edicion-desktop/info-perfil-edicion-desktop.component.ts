import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { MatDialog } from '@angular/material';
import { InfoPerfilCambioPasswordComponent } from '../info-perfil-cambio-password/info-perfil-cambio-password.component';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';

@Component({
  selector: 'app-info-perfil-edicion-desktop',
  templateUrl: './info-perfil-edicion-desktop.component.html',
  styleUrls: ['./info-perfil-edicion-desktop.component.css']
})
export class InfoPerfilEdicionDesktopComponent implements OnInit {

  @Input()
  perfilBasico: PerfilBasico;

  @Input()
  nombreEntidad: string;

  @Output()
  edicionPerfil: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  perfilActualizado: EventEmitter<any> = new EventEmitter<any>();

  avatar: string;

  constructor(
    public dialog: MatDialog,
    private perfilService: PerfilesService
  ) { }

  ngOnInit() {
    this.avatar = this.perfilBasico.informacionPersonal.avatar;
  }

  /**
   * Muetra la edición de perfil
   */
  editar() {
    this.edicionPerfil.emit();
  }

  /**
   * Muestra el cuadro para cambiar la contraseña
   */
  cambiarPassword() {
    let dialogRef = this.dialog.open(InfoPerfilCambioPasswordComponent, {
      panelClass: 'modal-sin-padding'
    });

    dialogRef.afterClosed().subscribe(
      () => this.perfilActualizado.emit()
    );
  }

  /**
   * Función encargada de actualizar el avatar del perfil
   * @param nuevoAvatar 
   */
  actualizarAvatar(nuevoAvatar: string) {
    this.perfilBasico.informacionPersonal.avatar = nuevoAvatar;
    this.perfilService.actualizarDatosPersonales(this.perfilBasico).subscribe(
      respuesta => {

        if (respuesta.exito == true) {
          this.perfilActualizado.emit();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
