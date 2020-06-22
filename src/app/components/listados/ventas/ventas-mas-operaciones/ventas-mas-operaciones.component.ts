import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VentasExportacionesService } from '../../../../services/ventas/ventas-exportaciones.service';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';

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
    let movimientos: Array<FijacionVenta> = this.data.movimientos;
    this.exportacionesService.exportarListadoVentasDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    /*let movimientos: Array<FijacionVenta> = this.data.movimientos;
    let totales: VentasTotales = this.data.totales;
    this.exportacionesService.exportarListadoVentasDetallePDF(movimientos, totales);*/
  }
}
