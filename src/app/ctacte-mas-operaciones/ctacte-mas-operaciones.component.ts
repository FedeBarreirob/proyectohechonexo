import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { ExcelService } from '../services/sharedServices/exportadores/excel/excel.service';

@Component({
  selector: 'app-ctacte-mas-operaciones',
  templateUrl: './ctacte-mas-operaciones.component.html',
  styleUrls: ['./ctacte-mas-operaciones.component.css']
})
export class CtacteMasOperacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<MovimientoCtaCte>,
    private excelService: ExcelService) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    this.excelService.exportAsExcelFile(this.data, "ctacte");
  }
}
