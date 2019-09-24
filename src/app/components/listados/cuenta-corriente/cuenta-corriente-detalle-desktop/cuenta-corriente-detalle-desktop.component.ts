import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cuenta-corriente-detalle-desktop',
  templateUrl: './cuenta-corriente-detalle-desktop.component.html',
  styleUrls: ['./cuenta-corriente-detalle-desktop.component.css']
})
export class CuentaCorrienteDetalleDesktopComponent implements OnInit {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<MovimientoCtaCte>;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  movimiento: MovimientoCtaCte;

  constructor() { }

  ngOnInit() {
    this.modoDetalleDesktopMovimiento$.subscribe(
      movimiento => this.cargar(movimiento)
    );
  }

  /**
   * Función encargada de cargar todos los datos
   * @param movimiento 
   */
  cargar(movimiento: MovimientoCtaCte) {
    this.movimiento = movimiento;
  }

  /**
   * Cierra el detalle
   */
  cerrar() {
    this.salir.next();
  }

}
