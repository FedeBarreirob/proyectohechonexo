import { Component, OnInit, Input } from '@angular/core';
import { FechasUtilService } from '../../../../../../services/sharedServices/convertidores/fechas-util.service';

@Component({
  selector: 'app-resumen-resumen-comprobante-apagar-item',
  templateUrl: './resumen-resumen-comprobante-apagar-item.component.html',
  styleUrls: ['./resumen-resumen-comprobante-apagar-item.component.css']
})
export class ResumenResumenComprobanteAPagarItemComponent implements OnInit {

  @Input()
  concepto: any;

  constructor(private fechasUtilService: FechasUtilService) { }

  ngOnInit() {
  }

  /**
  * Determina si es vencido
  */
  get esVencido(): boolean {
    if (this.concepto) {
      let hoy: Date = this.fechasUtilService.hoyFechaUnicamente();
      let fechaVecimiento: Date = this.fechasUtilService.fechaEsADate(<any>this.concepto.fechaVencimiento);

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
