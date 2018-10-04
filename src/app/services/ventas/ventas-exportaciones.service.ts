import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoVenta, VentasTotales } from '../../interfaces/ventas/listado-ventas';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VentasExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  // funcion que exporta a excel un movimiento de venta
  exportarVentasDetalleExcel(movimiento: MovimientoVenta) {
    try {
      let listado: Array<MovimientoVenta> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "ventas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ventas
  exportarVentasDetallePDF(movimiento: MovimientoVenta) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de ventas",
        ["Concepto", "Valor"],
        "ventas-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de ventas
  exportarListadoVentasDetalleExcel(movimimentos: Array<MovimientoVenta>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "ventas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ventas detalle
  exportarListadoVentasDetallePDF(movimimentos: Array<MovimientoVenta>, totales: VentasTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      for (let movimiento of movimimentos) {

        let signoMonetario = (movimiento.moneda == 'P') ? 'AR$' : 'US$';

        movimientosRows.push([
          `${movimiento.especie} ${movimiento.cosecha}`,
          movimiento.fecha,
          `${this.decimalPipe.transform(movimiento.kilosNetos, '.2')} Kg`,
          `${signoMonetario} ${this.decimalPipe.transform(movimiento.precioPorQuintal, '.2')}`
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
      let movimientosColumnas = ["Especia/Cosecha", "Fecha", "Kg.Netos", "Precio QQ"];
      columnas.push(movimientosColumnas);

      // totales
      // .. preparar datos
      let totalesRow = [];
      totalesRow.push(
        [
          "Total Kg. Netos",
          `${this.decimalPipe.transform(totales.totalKgNetos, '.2')} Kg`
        ]
      );
      totalesRow.push(
        [
          "Total Kg. Sin Fijar",
          `${this.decimalPipe.transform(totales.totalSinFijarTC, '.2')} Kg`
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
        "Movimientos de ventas",
        columnas,
        "ventas",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
