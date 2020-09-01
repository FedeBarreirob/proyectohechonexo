import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-cuenta-corriente-aplicada-item-desktop',
  templateUrl: './cuenta-corriente-aplicada-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-item-desktop.component.css']
})
export class CuentaCorrienteAplicadaItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCteAplicada;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  verDetalle: EventEmitter<MovimientoCtaCteAplicada> = new EventEmitter<MovimientoCtaCteAplicada>();

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
