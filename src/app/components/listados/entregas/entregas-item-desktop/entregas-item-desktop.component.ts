import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-item-desktop',
  templateUrl: './entregas-item-desktop.component.html',
  styleUrls: ['./entregas-item-desktop.component.css']
})
export class EntregasItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoEntrega;

  @Input()
  unidadMedida: string;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  public seleccionado: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Notifica que se ha cambiado la seleccion 
   * @param $event 
   */
  notificarCambioSeleccion($event) {
    this.cambioSeleccion.emit();
  }

  /**
   * Notifica un resumen para que sea mostrar en un detalle
   */
  notificarVerDetalle() {
    this.verDetalle.emit(this.movimiento);
  }
}
