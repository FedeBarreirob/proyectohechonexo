import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-cuenta-corriente-aplicada-header-item-desktop',
  templateUrl: './cuenta-corriente-aplicada-header-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-header-item-desktop.component.css']
})
export class CuentaCorrienteAplicadaHeaderItemDesktopComponent implements OnInit {

  @Output()
  cambioSeleccion: EventEmitter<boolean> = new EventEmitter<boolean>();

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
