import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContratoTipoPesificacion } from '../../../../../../enums/contrato-tipo-pesificacion.enum';

@Component({
  selector: 'app-definicion-de-un-boleto-apesificar',
  templateUrl: './definicion-de-un-boleto-apesificar.component.html',
  styleUrls: ['./definicion-de-un-boleto-apesificar.component.css']
})
export class DefinicionDeUnBoletoAPesificarComponent implements OnInit {

  @Input()
  boletoAPesificar: any;

  @Input()
  unidadMedida: string;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  contratoTipoPesificacion = ContratoTipoPesificacion;
  tipoPesificacion: ContratoTipoPesificacion = ContratoTipoPesificacion.PARCIAL;
  stockAPesificar: number = 0;
  boletoSeleccionado: boolean = false;
  modoVerDetalle: boolean = false;

  constructor() { }

  ngOnInit() {
    this.cargarConfSeteadaPreviamente();
  }

  /**
   * Devuelve la diferencia entre lo disponible a pesificar menos lo indicado a pesificar
   */
  get saldoBoleto(): number {
    if (this.tipoPesificacion == ContratoTipoPesificacion.PARCIAL) {
      return Number.parseFloat(this.boletoAPesificar.kgDisponiblesPendientesDePesificar) - this.stockAPesificar;
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
   * Notifica cambios asociados al cambio de las opciones a pesificar
   */
  notificarCambios() {
    let pesificacion = {
      boleto: this.boletoAPesificar,
      boletoSeleccionado: this.boletoSeleccionado,
      tipoPesificacion: this.tipoPesificacion,
      stockAPesificar: this.stockAPesificar
    };

    this.change.emit(pesificacion);
  }

  /**
   * Carga las opciones seleccionadas previamente si estas se encuentran
   */
  cargarConfSeteadaPreviamente() {
    if (this.boletoAPesificar && this.boletoAPesificar.pesificacionPrevia) {
      this.boletoSeleccionado = this.boletoAPesificar.pesificacionPrevia.boletoSeleccionado;
      this.tipoPesificacion = this.boletoAPesificar.pesificacionPrevia.tipoPesificacion;
      this.stockAPesificar = this.boletoAPesificar.pesificacionPrevia.stockAPesificar;
    }
  }
}
