import { Component, OnInit, Input } from '@angular/core';
import { Notificacion } from 'src/app/interfaces/notificaciones/notificacion';

@Component({
  selector: 'app-panel-notificaciones-item',
  templateUrl: './panel-notificaciones-item.component.html',
  styleUrls: ['./panel-notificaciones-item.component.css']
})
export class PanelNotificacionesItemComponent implements OnInit {

  @Input()
  notificacion: Notificacion;

  constructor() { }

  ngOnInit() {
  }

}
