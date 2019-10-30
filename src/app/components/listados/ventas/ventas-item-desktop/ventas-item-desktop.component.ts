import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';

@Component({
  selector: 'app-ventas-item-desktop',
  templateUrl: './ventas-item-desktop.component.html',
  styleUrls: ['./ventas-item-desktop.component.css']
})
export class VentasItemDesktopComponent implements OnInit {

  @Input()
  movimiento: FijacionVenta;

  @Input()
  unidadMedida: string;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<FijacionVenta> = new EventEmitter<FijacionVenta>();

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
   * Notifica un movimiento para que sea mostrar en un detalle
   */
  notificarVerDetalle() {
    this.verDetalle.emit(this.movimiento);
  }
}
