import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoComprobantesPendFact, ComprobantesPendFactTotales } from '../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompPendFactExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  // funcion que exporta a excel un movimiento de comprobante pendiente de facturar
  exportarCompPendFactDetalleExcel(movimiento: MovimientoComprobantesPendFact) {
    try {
      let listado: Array<MovimientoComprobantesPendFact> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "comprobante-pend-fact");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de comprobante pendiente de facturar
  exportarCompPendFactDetallePDF(movimiento: MovimientoComprobantesPendFact) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de comprobantes pendientes de facturar",
        ["Concepto", "Valor"],
        "comprobante-pend-fact-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de comprobantes pendientes de facturar
  exportarListadoCompPendFactDetalleExcel(movimimentos: Array<MovimientoComprobantesPendFact>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "comprobante-pend-fact");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de comprobante pendiente de facturar
  exportarListadoCompPendFactDetallePDF(movimimentos: Array<MovimientoComprobantesPendFact>, totales: ComprobantesPendFactTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      for (let movimiento of movimimentos) {
        movimientosRows.push([
          movimiento.descripcionArticulo,
          movimiento.fecha,
          movimiento.cantidad,
          movimiento.cantidadPendiente
        ]);
      }
      rows.push(movimientosRows);

      // .. preparar opciones
      let movimientosOpciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: '25%', halign: 'left' },
          1: { columnWidth: '25%', halign: 'left' },
          2: { columnWidth: '25%', halign: 'right' },
          3: { columnWidth: '25%', halign: 'right' }
        }
      };
      opciones.push(movimientosOpciones);

      // .. columnas
      let movimientosColumnas = ["Artículo", "Fecha", "Cantidad", "Cant.Pendiente"];
      columnas.push(movimientosColumnas);

      // totales
      // .. preparar datos
      let totalesRow = [];
      totalesRow.push(
        [
          "Total Cantidad",
          this.decimalPipe.transform(totales.totalCantidad, '.0')
        ]
      );
      totalesRow.push(
        [
          "Total Cantidad Pendiente",
          this.decimalPipe.transform(totales.totalCantidadPendiente, '.0')
        ]
      );
      totalesRow.push(
        [
          "Total",
          `US$ ${this.decimalPipe.transform(totales.totalTotal, '.2')}`
        ]
      );
      rows.push(totalesRow);

      // .. preparar opciones
      let totalesOpciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: '50%', halign: 'left' },
          1: { columnWidth: '50%', halign: 'right' },
        }
      };
      opciones.push(totalesOpciones);

      // .. columnas
      let totalesColumnas = ["Concepto", "Valor"];
      columnas.push(totalesColumnas);

      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        "Comprobantes pendientes de facturar",
        columnas,
        "comprobantes-pend-fact",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
