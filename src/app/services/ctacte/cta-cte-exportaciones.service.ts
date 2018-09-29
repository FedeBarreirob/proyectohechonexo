import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoCtaCte } from '../../interfaces/ctacte/listado.ctacte';

@Injectable({
  providedIn: 'root'
})
export class CtaCteExportacionesService {

  constructor(private excelService: ExcelService, private pdfService: PdfService) { }

  // funcion que exporta a excel un movimiento de ctacte detalle
  exportarMovCtaCteDetalleExcel(movimiento: MovimientoCtaCte) {
    try {
      let listado: Array<MovimientoCtaCte> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "ctacte");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ctacte detalle
  exportarMovCtaCteDetallePDF(movimiento: MovimientoCtaCte) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de cuenta corriente",
        ["Concepto", "Valor"],
        "cuenta-corriente-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de ctacte detalle
  exportarListadoMovCtaCteDetalleExcel(movimimentos: Array<MovimientoCtaCte>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "ctacte");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ctacte detalle
  exportarListadoMovCtaCteDetallePDF(movimimentos: Array<MovimientoCtaCte>) {
    try {

      // preparar datos
      let rows = [];
      for (let movimiento of movimimentos) {
        rows.push([
          movimiento.concepto,
          movimiento.fechaVencimiento,
          movimiento.importeComprobantePesos,
          movimiento.importeComprobanteDolares
        ]);
      }

      // preparar opciones
      let opciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: '25%', halign: 'left' },
          1: { columnWidth: '25%', halign: 'left' },
          2: { columnWidth: '25%', halign: 'right' },
          3: { columnWidth: '25%', halign: 'right' }
        }
      };

      // renderizar
      this.pdfService.listaAPdf(
        rows,
        "Movimientos de cuenta corriente",
        ["Concepto", "Fecha", "Pesos", "Dolares"],
        "cuenta-corriente",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
