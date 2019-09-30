import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { MatDialog } from '@angular/material';

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

  avatar: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.avatar = this.perfilBasico.informacionPersonal.avatar;
  }

  /**
   * Muetra la edición de perfil
   */
  editar() {
    this.edicionPerfil.emit();
  }
}
