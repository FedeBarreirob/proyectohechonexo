import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoComprobantesPendFact, ComprobantesPendFactTotales } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { CompPendFactExportacionesService } from '../../../../services/comprobantes-pend-facturar/comp-pend-fact-exportaciones.service';

@Component({
  selector: 'app-comprobantes-pend-facturar-mas-operaciones',
  templateUrl: './comprobantes-pend-facturar-mas-operaciones.component.html',
  styleUrls: ['./comprobantes-pend-facturar-mas-operaciones.component.css']
})
export class ComprobantesPendFacturarMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exportacionesService: CompPendFactExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    let movimientos: Array<MovimientoComprobantesPendFact> = this.data.movimientos;
    this.exportacionesService.exportarListadoCompPendFactDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    let movimientos: Array<MovimientoComprobantesPendFact> = this.data.movimientos;
    let totales: ComprobantesPendFactTotales = this.data.totales;
    this.exportacionesService.exportarListadoCompPendFactDetallePDF(movimientos, totales);
  }
}
