import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { CtaCteAplicadaExportacionesServiceService } from '../../../../services/ctacte-aplicada/cta-cte-aplicada-exportaciones-service.service';

@Component({
  selector: 'app-cta-cte-aplicada-detalle-mas-operaciones',
  templateUrl: './cta-cte-aplicada-detalle-mas-operaciones.component.html',
  styleUrls: ['./cta-cte-aplicada-detalle-mas-operaciones.component.css']
})
export class CtaCteAplicadaDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCteAplicada,
    private exportadorService: CtaCteAplicadaExportacionesServiceService
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
