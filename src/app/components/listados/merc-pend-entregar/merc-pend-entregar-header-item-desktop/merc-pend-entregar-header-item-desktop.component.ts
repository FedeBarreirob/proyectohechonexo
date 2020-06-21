import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-merc-pend-entregar-header-item-desktop',
  templateUrl: './merc-pend-entregar-header-item-desktop.component.html',
  styleUrls: ['./merc-pend-entregar-header-item-desktop.component.css']
})
export class MercPendEntregarHeaderItemDesktopComponent implements OnInit {

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
