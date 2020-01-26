import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-comprobantes-pend-facturar-header-item-desktop',
  templateUrl: './comprobantes-pend-facturar-header-item-desktop.component.html',
  styleUrls: ['./comprobantes-pend-facturar-header-item-desktop.component.css']
})
export class ComprobantesPendFacturarHeaderItemDesktopComponent implements OnInit {

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
