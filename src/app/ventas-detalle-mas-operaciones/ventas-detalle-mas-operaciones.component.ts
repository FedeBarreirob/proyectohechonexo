import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoVenta } from '../interfaces/ventas/listado-ventas';
import { VentasExportacionesService } from '../services/ventas/ventas-exportaciones.service';

@Component({
  selector: 'app-ventas-detalle-mas-operaciones',
  templateUrl: './ventas-detalle-mas-operaciones.component.html',
  styleUrls: ['./ventas-detalle-mas-operaciones.component.css']
})
export class VentasDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoVenta,
    private exportadorService: VentasExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    this.exportadorService.exportarVentasDetalleExcel(this.data);
  }

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    this.exportadorService.exportarVentasDetallePDF(this.data);
  }
}
