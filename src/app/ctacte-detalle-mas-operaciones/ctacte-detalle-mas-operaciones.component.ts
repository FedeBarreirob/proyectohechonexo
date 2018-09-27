import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { ExcelService } from '../services/sharedServices/exportadores/excel/excel.service';

@Component({
  selector: 'app-ctacte-detalle-mas-operaciones',
  templateUrl: './ctacte-detalle-mas-operaciones.component.html',
  styleUrls: ['./ctacte-detalle-mas-operaciones.component.css']
})
export class CtacteDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCte,
    private excelService: ExcelService) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    let listado: Array<MovimientoCtaCte> = [];
    listado.push(this.data);

    this.excelService.exportAsExcelFile(listado, "ctacte");
  }
}
