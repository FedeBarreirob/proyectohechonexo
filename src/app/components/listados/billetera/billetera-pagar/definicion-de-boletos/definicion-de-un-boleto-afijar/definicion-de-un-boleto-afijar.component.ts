import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContratoTipoFijacion } from '../../../../../../enums/contrato-tipo-fijacion.enum';
import { ContratoTipoPrecioFijacion } from '../../../../../../enums/contrato-tipo-precio-fijacion.enum';

@Component({
  selector: 'app-definicion-de-un-boleto-afijar',
  templateUrl: './definicion-de-un-boleto-afijar.component.html',
  styleUrls: ['./definicion-de-un-boleto-afijar.component.css']
})
export class DefinicionDeUnBoletoAFijarComponent implements OnInit {

  @Input()
  boletoAFijar: any;

  @Input()
  unidadMedida: string;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  contratoTipoFijacion = ContratoTipoFijacion;
  contratoTipoPrecioFijacion = ContratoTipoPrecioFijacion;

  tipoFijacion: ContratoTipoFijacion = ContratoTipoFijacion.PARCIAL;
  stockAFijar: number = 0;
  boletoSeleccionado: boolean = false;
  tipoPrecioFijacion: ContratoTipoPrecioFijacion = ContratoTipoPrecioFijacion.PIZARRA;
  precioDelDia: number = 0;

  modoVerDetalle: boolean = false;

  constructor() { }

  ngOnInit() {
    this.cargarConfSeteadaPreviamente();
  }

  /**
   * Devuelve la diferencia entre lo disponible a fijar menos lo indicado a fijar
   */
  get saldoBoleto(): number {
    if (this.tipoFijacion == ContratoTipoFijacion.PARCIAL) {
      return Number.parseFloat(this.boletoAFijar.kgDisponiblesPendientesDeFijar) - this.stockAFijar;
    } else {
      return 0;
    }
  }

  /**
   * Cambia la visualizacion de detalle
   */
  toggleModoVerDetalle() {
    this.modoVerDetalle = !this.modoVerDetalle;
  }

  /**
   * Notifica cambios asociados al cambio de las opciones a fijar
   */
  notificarCambios() {
    let fijacion = {
      boleto: this.boletoAFijar,
      boletoSeleccionado: this.boletoSeleccionado,
      tipoFijacion: this.tipoFijacion,
      stockAFijar: this.stockAFijar,
      tipoPrecioFijacion: this.tipoPrecioFijacion,
      precioDelDia: this.precioDelDia
    };

    this.change.emit(fijacion);
  }

  /**
   * Carga las opciones seleccionadas previamente si estas se encuentran
   */
  cargarConfSeteadaPreviamente() {
    if (this.boletoAFijar && this.boletoAFijar.fijacionPrevia) {
      this.boletoSeleccionado = this.boletoAFijar.fijacionPrevia.boletoSeleccionado;
      this.tipoFijacion = this.boletoAFijar.fijacionPrevia.tipoFijacion;
      this.stockAFijar = this.boletoAFijar.fijacionPrevia.stockAFijar;
      this.tipoPrecioFijacion = this.boletoAFijar.fijacionPrevia.tipoPrecioFijacion;
      this.precioDelDia = this.boletoAFijar.fijacionPrevia.precioDelDia;
    }
  }
}
