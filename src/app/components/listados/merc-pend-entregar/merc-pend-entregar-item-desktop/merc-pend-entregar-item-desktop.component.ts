import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoMercPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';

@Component({
  selector: 'app-merc-pend-entregar-item-desktop',
  templateUrl: './merc-pend-entregar-item-desktop.component.html',
  styleUrls: ['./merc-pend-entregar-item-desktop.component.css']
})
export class MercPendEntregarItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoMercPendEntregar;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<MovimientoMercPendEntregar> = new EventEmitter<MovimientoMercPendEntregar>();

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
