import { Component, OnInit, Input } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FechasUtilService } from '../../../../../../services/sharedServices/convertidores/fechas-util.service';

@Component({
  selector: 'app-resumen-pago-comprobante-apagar',
  templateUrl: './resumen-pago-comprobante-apagar.component.html',
  styleUrls: ['./resumen-pago-comprobante-apagar.component.css']
})
export class ResumenPagoComprobanteAPagarComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCteAplicada;

  constructor(private fechasUtilService: FechasUtilService) { }

  ngOnInit() {
  }

  /**
   * Determina si es vencido
   */
  get esVencido(): boolean {
    if (this.movimiento) {
      let hoy: Date = this.fechasUtilService.hoyFechaUnicamente();
      let fechaVecimiento: Date = this.fechasUtilService.fechaEsADate(<any>this.movimiento.fechaVencimiento);

      if (fechaVecimiento <= hoy) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }
}
