import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { CtaCteExportacionesService } from '../services/ctacte/cta-cte-exportaciones.service';

@Component({
  selector: 'app-ctacte-detalle-mas-operaciones',
  templateUrl: './ctacte-detalle-mas-operaciones.component.html',
  styleUrls: ['./ctacte-detalle-mas-operaciones.component.css']
})
export class CtacteDetalleMasOperacionesComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCte,
      private exportadorService: CtaCteExportacionesService
    ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    this.exportadorService.exportarMovCtaCteDetalleExcel(this.data);
  }

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    this.exportadorService.exportarMovCtaCteDetallePDF(this.data);
  }
}
