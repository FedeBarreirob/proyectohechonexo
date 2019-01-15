import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoComprobantesPendFact } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { CompPendFactExportacionesService } from '../../../../services/comprobantes-pend-facturar/comp-pend-fact-exportaciones.service';

@Component({
  selector: 'app-comprobantes-pend-facturar-detalle-mas-operaciones',
  templateUrl: './comprobantes-pend-facturar-detalle-mas-operaciones.component.html',
  styleUrls: ['./comprobantes-pend-facturar-detalle-mas-operaciones.component.css']
})
export class ComprobantesPendFacturarDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoComprobantesPendFact,
    private exportadorService: CompPendFactExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    this.exportadorService.exportarCompPendFactDetalleExcel(this.data);
  }

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    this.exportadorService.exportarCompPendFactDetallePDF(this.data);
  }
}
