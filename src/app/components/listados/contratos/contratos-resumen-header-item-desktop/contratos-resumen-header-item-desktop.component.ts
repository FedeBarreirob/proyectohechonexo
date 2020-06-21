import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-contratos-resumen-header-item-desktop',
  templateUrl: './contratos-resumen-header-item-desktop.component.html',
  styleUrls: ['./contratos-resumen-header-item-desktop.component.css']
})
export class ContratosResumenHeaderItemDesktopComponent implements OnInit {

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
