import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoVenta, VentasTotales } from '../../interfaces/ventas/listado-ventas';
import { DecimalPipe } from '@angular/common';
import { FijacionVenta } from '../../interfaces/ventas/fijacion-venta';

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
  exportarVentasDetalleExcel(movimiento: FijacionVenta) {
    try {
      let listado: Array<FijacionVenta> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "ventas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ventas
  exportarVentasDetallePDF(movimiento: FijacionVenta) {
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
  exportarListadoVentasDetalleExcel(movimimentos: Array<FijacionVenta>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "ventas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ventas detalle
  exportarListadoVentasDetallePDF(movimimentos: Array<FijacionVenta>, totales: VentasTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      let sumaNetos = 0;
      for (let movimiento of movimimentos) {

        let signoMonetario = (movimiento.moneda == 'P') ? 'AR$' : 'US$';

        movimientosRows.push([
          `${movimiento.especie} ${movimiento.cosecha}`,
          movimiento.fecha,
          `${this.decimalPipe.transform(movimiento.kilos, '.2')} Kg`,
          `${signoMonetario} ${this.decimalPipe.transform(movimiento.precioPorQuintal, '.2')}`
        ]);
        sumaNetos += movimiento.kilos;
      }
      rows.push(movimientosRows);

      // .. preparar opciones
      let headerTotalsCountDatos = 0;
      let movimientosOpciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: '25%', halign: 'left' },
          1: { columnWidth: '25%', halign: 'left' },
          2: { columnWidth: '25%', halign: 'right' },
          3: { columnWidth: '25%', halign: 'right' }
        },
        createdHeaderCell: function (cell, data) {
          cell.styles.columnWidth = data.settings.columnStyles[headerTotalsCountDatos].columnWidth;
          cell.styles.halign = data.settings.columnStyles[headerTotalsCountDatos].halign;
          headerTotalsCountDatos++;
        }
      };
      opciones.push(movimientosOpciones);

      // .. columnas
      let movimientosColumnas = ["Especia/Cosecha", "Fecha", "Kg.Netos", "Precio QQ"];
      columnas.push(movimientosColumnas);

      // Totales
      rows.push([[
        "Totales",
        `${this.decimalPipe.transform(sumaNetos, '.2')} Kg`,
        ""
      ]]);
      let headerTotalsCount = 0;
      opciones.push({
        startY: 30,
        columnStyles: {
          // fullWidth: 182
          0: { columnWidth: 102, halign: 'left', fontStyle: 'bold' },
          1: { columnWidth: 40, halign: 'right', fontStyle: 'bold' },
          2: { columnWidth: 40, halign: 'right', fontStyle: 'bold' }
        },
        createdHeaderCell: function (cell, data) {
          cell.styles.columnWidth = data.settings.columnStyles[headerTotalsCount].columnWidth;
          cell.styles.halign = data.settings.columnStyles[headerTotalsCount].halign;
          headerTotalsCount++;
        }
      });
      columnas.push(["Resumen", "Netos", ""]);

      // totales
      if (totales) {

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
      }

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
