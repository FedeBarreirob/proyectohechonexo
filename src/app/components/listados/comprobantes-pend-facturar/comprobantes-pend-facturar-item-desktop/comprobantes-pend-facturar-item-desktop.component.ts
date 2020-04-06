import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoComprobantesPendFact } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';

@Component({
  selector: 'app-comprobantes-pend-facturar-item-desktop',
  templateUrl: './comprobantes-pend-facturar-item-desktop.component.html',
  styleUrls: ['./comprobantes-pend-facturar-item-desktop.component.css']
})

export class ComprobantesPendFacturarItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoComprobantesPendFact;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<MovimientoComprobantesPendFact> = new EventEmitter<MovimientoComprobantesPendFact>();

  public seleccionado: boolean;

  constructor() { }

  ngOnInit() {
    this.movimiento.cantidad = Math.round(this.movimiento.cantidad);
    this.movimiento.cantidadPendiente = Math.round(this.movimiento.cantidadPendiente);
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
