import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoMercPendEntregar, MercPendEntregarTotales } from '../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MercPendEntregarExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  // funcion que exporta a excel un movimiento de mercaderia pend de entregar
  exportarMercPendEntregarDetalleExcel(movimiento: MovimientoMercPendEntregar) {
    try {
      let listado: Array<MovimientoMercPendEntregar> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "merc-pend-entregar");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de mercaderia pend entregar
  exportarMercPendEntregarDetallePDF(movimiento: MovimientoMercPendEntregar) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de mercadería pendiente de entregar",
        ["Concepto", "Valor"],
        "merc-pend-entregar-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de mercaderia pendiente de entregar
  exportarListadoMercPendEntregarDetalleExcel(movimimentos: Array<MovimientoMercPendEntregar>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "merc-pend-entregar");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de mercaderia pendiente de entregar detalle
  exportarListadoMercPendEntregarDetallePDF(movimimentos: Array<MovimientoMercPendEntregar>, totales: MercPendEntregarTotales) {
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
      if (totales) {
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
      }

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
        "Movimientos de mercadería pendiente de entregar",
        columnas,
        "merc-pend-entregar",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
