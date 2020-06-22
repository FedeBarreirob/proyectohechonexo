import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCteAplicada, SaldosTotales } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { CtaCteAplicadaExportacionesServiceService } from '../../../../services/ctacte-aplicada/cta-cte-aplicada-exportaciones-service.service';

@Component({
  selector: 'app-cta-cte-aplicada-mas-operaciones',
  templateUrl: './cta-cte-aplicada-mas-operaciones.component.html',
  styleUrls: ['./cta-cte-aplicada-mas-operaciones.component.css']
})
export class CtaCteAplicadaMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exportacionesService: CtaCteAplicadaExportacionesServiceService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    let movimientos: Array<MovimientoCtaCteAplicada> = this.data.movimientos;
    this.exportacionesService.exportarListadoMovCtaCteDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    let movimientos: Array<MovimientoCtaCteAplicada> = this.data.movimientos;
    let saldos: SaldosTotales = this.data.saldos;
    this.exportacionesService.exportarListadoMovCtaCteDetallePDF(movimientos, saldos);
  }
}
