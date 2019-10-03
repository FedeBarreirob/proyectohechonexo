import { Component, OnInit, Input } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { KilosAPipe } from '../../../../pipes/kilos-a.pipe';
import { KilosTextoAPipe } from '../../../../pipes/kilos-texto-a.pipe';

@Component({
  selector: 'app-contratos-resumen-item-desktop',
  templateUrl: './contratos-resumen-item-desktop.component.html',
  styleUrls: ['./contratos-resumen-item-desktop.component.css'],
  providers: [
    KilosAPipe,
    KilosTextoAPipe
  ]
})
export class ContratosResumenItemDesktopComponent implements OnInit {

  @Input()
  resumen: ResumenContratoCompraVenta;

  @Input()
  unidadMedida: string;

  constructor(
    private kilosApipe: KilosAPipe,
    private kilosTextoApipe: KilosTextoAPipe
  ) { }

  ngOnInit() {
  }

  /**
   * Devuelve el texto para el tooltips de entregas
   */
  get tooltipEntregas() {
    if (this.resumen.kilosPendientesEntregar != 0) {
      return `Tenés ${parseFloat(this.kilosApipe.transform(this.resumen.kilosPendientesEntregar, this.unidadMedida)).toFixed(0)} ${this.kilosTextoApipe.transform(this.resumen.kilosPendientesEntregar, this.unidadMedida)} pendientes de entregar`;
    } else {
      return "No tenés nada pendiente de entregar";
    }
  }

  /**
   * Devuelve el texto para el tooltips de fijaciones
   */
  get tooltipFijaciones() {
    if (this.resumen.kilosAFijar != 0) {
      return `Tenés ${parseFloat(this.kilosApipe.transform(this.resumen.kilosAFijar, this.unidadMedida)).toFixed(0)} ${this.kilosTextoApipe.transform(this.resumen.kilosAFijar, this.unidadMedida)} pendientes de fijar`;
    } else {
      return "No tenés nada pendiente de fijar";
    }
  }

  /**
   * Devuelve el texto para el tooltips de pesificaciones
   */
  get tooltipPesificaciones() {
    if (this.resumen.kilosPendientesPesificar != 0) {
      return `Tenés ${parseFloat(this.kilosApipe.transform(this.resumen.kilosPendientesPesificar, this.unidadMedida)).toFixed(0)} ${this.kilosTextoApipe.transform(this.resumen.kilosPendientesPesificar, this.unidadMedida)} pendientes de pesificar`;
    } else {
      return "No tenés nada pendiente de pesificar";
    }
  }

  /**
   * Devuelve el texto para el tooltips de liquidaciones
   */
  get tooltipLiquidaciones() {
    if (this.resumen.pendienteFacturar != 0) {
      return `Tenés ${parseFloat(this.kilosApipe.transform(this.resumen.pendienteFacturar, this.unidadMedida)).toFixed(0)} ${this.kilosTextoApipe.transform(this.resumen.pendienteFacturar, this.unidadMedida)} pendientes de liquidar`;
    } else {
      return "No tenés nada pendiente de liquidar";
    }
  }

  /**
   * Devuelve el texto para el tooltips de pagados
   */
  get tooltipPagados() {
    if (this.resumen.porcentajeKilosPagados != 100) {
      return `Tenés ${parseFloat(this.kilosApipe.transform(this.resumen.kilosPactados - this.resumen.kilosPagados, this.unidadMedida)).toFixed(0)} ${this.kilosTextoApipe.transform(this.resumen.pendienteFacturar, this.unidadMedida)} pendientes`;
    } else {
      return "No tenés pagos pendientes";
    }
  }
}
