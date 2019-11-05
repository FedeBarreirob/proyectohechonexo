import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';

@Component({
  selector: 'app-cuenta-corriente-item-desktop',
  templateUrl: './cuenta-corriente-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-item-desktop.component.css']
})
export class CuentaCorrienteItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCte;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<MovimientoCtaCte> = new EventEmitter<MovimientoCtaCte>();

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
    if (this.movimiento.concepto != 'TRANSPORTE') {
      this.verDetalle.emit(this.movimiento);
    }
  }

}
