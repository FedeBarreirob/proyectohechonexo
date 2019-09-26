import { Component, OnInit, Input } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { MatDialog } from '@angular/material';
import { InfoPerfilEdicionComponent } from '../info-perfil-edicion/info-perfil-edicion.component';

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

  avatar: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.avatar = this.perfilBasico.informacionPersonal.avatar;
  }

  /**
	 * Abre el modal para editar el perfil
	 */
  editar() {
    let dialogEditarRef = this.dialog.open(InfoPerfilEdicionComponent, {
      maxWidth: '50vw',
      width: '50%',
      panelClass: 'modal-sin-padding',
      data: this.perfilBasico
    });
  }
}
