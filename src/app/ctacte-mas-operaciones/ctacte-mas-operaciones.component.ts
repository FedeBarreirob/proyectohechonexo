import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { CtaCteExportacionesService } from '../services/ctacte/cta-cte-exportaciones.service';

@Component({
  selector: 'app-ctacte-mas-operaciones',
  templateUrl: './ctacte-mas-operaciones.component.html',
  styleUrls: ['./ctacte-mas-operaciones.component.css']
})
export class CtacteMasOperacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<MovimientoCtaCte>,
    private exportacionesService: CtaCteExportacionesService) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    this.exportacionesService.exportarListadoMovCtaCteDetalleExcel(this.data);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    this.exportacionesService.exportarListadoMovCtaCteDetallePDF(this.data);
  }
}
