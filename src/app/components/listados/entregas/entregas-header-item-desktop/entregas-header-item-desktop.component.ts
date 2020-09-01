import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-entregas-header-item-desktop',
  templateUrl: './entregas-header-item-desktop.component.html',
  styleUrls: ['./entregas-header-item-desktop.component.css']
})
export class EntregasHeaderItemDesktopComponent implements OnInit {

  @Output()
  cambioSeleccion: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Notifica que se ha cambiado la seleccion 
   * @param $event 
   */
  notificarCambioSeleccion($event: MatCheckboxChange) {
    this.cambioSeleccion.emit($event.checked);
  }
}
