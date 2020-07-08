import { Component, OnInit, Input } from '@angular/core';
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
    console.log(this.boletoAFijar);
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
}
