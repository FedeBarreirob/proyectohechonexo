import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-item-movil',
  templateUrl: './entregas-item-movil.component.html',
  styleUrls: ['./entregas-item-movil.component.css']
})
export class EntregasItemMovilComponent implements OnInit {

  @Input()
  movimiento: MovimientoEntrega;

  @Input()
  unidadMedida: string;

  @Output()
  cambioSeleccion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  detalle: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  mostrarCheck$: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  @Input()
  public seleccionado: boolean;

  @Input()
  public mostrarCheck: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Notifica que se ha cambiado la seleccion 
   * @param $event 
   */
  notificarCambioSeleccion($event) {
    this.cambioSeleccion.emit({
      checked: $event.checked,
      movimiento: this.movimiento
    });
  }

  /**
   * Click para ver detalle 
   * @param $event 
   */
  verDetalle() {
    this.detalle.emit(this.movimiento);
  }

  /**
   * Presionado para ver check 
   * @param $event 
   */
  onPress() {
    this.seleccionado = true;
    this.mostrarCheck$.emit(this.movimiento);
  }
}
