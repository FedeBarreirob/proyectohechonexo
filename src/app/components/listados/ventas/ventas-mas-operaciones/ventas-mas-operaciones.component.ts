import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoVenta, VentasTotales } from '../../../../interfaces/ventas/listado-ventas';
import { VentasExportacionesService } from '../../../../services/ventas/ventas-exportaciones.service';

@Component({
  selector: 'app-ventas-mas-operaciones',
  templateUrl: './ventas-mas-operaciones.component.html',
  styleUrls: ['./ventas-mas-operaciones.component.css']
})
export class VentasMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exportacionesService: VentasExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    let movimientos: Array<MovimientoVenta> = this.data.movimientos;
    this.exportacionesService.exportarListadoVentasDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    let movimientos: Array<MovimientoVenta> = this.data.movimientos;
    let totales: VentasTotales = this.data.totales;
    this.exportacionesService.exportarListadoVentasDetallePDF(movimientos, totales);
  }
}
