import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { ExcelService } from '../services/sharedServices/exportadores/excel/excel.service';
//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';
declare let jsPDF;

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

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    let pdf = new jsPDF('p', 'pt', 'letter');
    pdf.text(20,20,'Detalle de movimiento de cuenta corriente');
    
    /*
    usar este codigo para el listado
    let columns : Array<string> = Object.keys(this.data);

    let row = [];
    for(let celdaKey of columns) {
      row.push(this.data[celdaKey]);
    }
    let rows = [];
    rows.push(row);*/

    //codigo para detalle
    let columns = ["Concepto", "Valor"];

    let rows = [];
    for(let celdaKey of Object.keys(this.data)) {
      let valor = (this.data[celdaKey] != null) ? this.data[celdaKey] : ''; 
      rows.push([celdaKey, valor]);
    }

    /*Object.keys(this.data).map(function(key, index) {
      
    });*/

    /*let columns = ["ID", "Name", "Country"];
    let rows = [
        [1, "Shaw", "Tanzania"],
        [2, "Nelson", "Kazakhstan"],
        [3, "Garcia", "Madagascar"],
    ];*/
    pdf.autoTable(columns, rows);

    pdf.save('cuenta-corriente-detalle.pdf');
  }
}
