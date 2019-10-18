import { Component, OnInit, Input } from '@angular/core';
import { Notificacion } from '../../../interfaces/notificaciones/notificacion';
import { MatDialog } from '@angular/material';
import { NotificacionDetalleComponent } from '../notificacion-detalle/notificacion-detalle.component';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';

@Component({
  selector: 'app-panel-notificaciones-item',
  templateUrl: './panel-notificaciones-item.component.html',
  styleUrls: ['./panel-notificaciones-item.component.css']
})
export class PanelNotificacionesItemComponent implements OnInit {

  @Input()
  notificacion: Notificacion;

  estadoNotificacion = EstadoNotificaciones;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  /**
   * Muestra el detalle de una notificacion
   */
  verDetalle() {
    const dialogRef = this.dialog.open(NotificacionDetalleComponent, {
      data: this.notificacion
    });

    // marcar como leido
    dialogRef.afterClosed().subscribe(
      data => {
        this.notificacion.estado = EstadoNotificaciones.LEIDO;
      }
    );
  }
}
