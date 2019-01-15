import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';

@Component({
  selector: 'app-entregas-detalle-mas-operaciones',
  templateUrl: './entregas-detalle-mas-operaciones.component.html',
  styleUrls: ['./entregas-detalle-mas-operaciones.component.css']
})
export class EntregasDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega,
    private exportadorService: EntregasExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    this.exportadorService.exportarEntregasDetalleExcel(this.data);
  }

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    this.exportadorService.exportarEntregasDetallePDF(this.data);
  }
}
