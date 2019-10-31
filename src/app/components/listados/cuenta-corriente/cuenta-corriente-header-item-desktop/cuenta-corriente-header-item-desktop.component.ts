import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-cuenta-corriente-header-item-desktop',
  templateUrl: './cuenta-corriente-header-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-header-item-desktop.component.css']
})
export class CuentaCorrienteHeaderItemDesktopComponent implements OnInit {

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
