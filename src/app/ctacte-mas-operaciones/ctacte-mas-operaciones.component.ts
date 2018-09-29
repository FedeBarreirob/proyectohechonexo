import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte, SaldosTotales } from '../interfaces/ctacte/listado.ctacte';
import { CtaCteExportacionesService } from '../services/ctacte/cta-cte-exportaciones.service';

@Component({
  selector: 'app-ctacte-mas-operaciones',
  templateUrl: './ctacte-mas-operaciones.component.html',
  styleUrls: ['./ctacte-mas-operaciones.component.css']
})
export class CtacteMasOperacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private exportacionesService: CtaCteExportacionesService) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    let movimientos: Array<MovimientoCtaCte> = this.data.movimientos;
    this.exportacionesService.exportarListadoMovCtaCteDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    let movimientos: Array<MovimientoCtaCte> = this.data.movimientos;
    let saldos: SaldosTotales = this.data.saldos;
    this.exportacionesService.exportarListadoMovCtaCteDetallePDF(movimientos, saldos);
  }
}
