import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoCtaCteAplicada, SaldosTotales } from '../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CtaCteAplicadaExportacionesServiceService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe) { }

  // funcion que exporta a excel un movimiento de ctacte aplicada detalle
  exportarMovCtaCteDetalleExcel(movimiento: MovimientoCtaCteAplicada) {
    try {
      let listado: Array<MovimientoCtaCteAplicada> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "ctacte-aplicada");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ctacte aplicada detalle
  exportarMovCtaCteDetallePDF(movimiento: MovimientoCtaCteAplicada) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de cuenta corriente aplicada",
        ["Concepto", "Valor"],
        "cuenta-corriente-detalle-aplicada"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de ctacte detallea aplicada
  exportarListadoMovCtaCteDetalleExcel(movimimentos: Array<MovimientoCtaCteAplicada>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "ctacte-aplicada");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de ctacte detalle aplicada
  exportarListadoMovCtaCteDetallePDF(movimimentos: Array<MovimientoCtaCteAplicada>, saldos: SaldosTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      let sumaPesos = 0;
      let sumaDolares = 0;
      for (let movimiento of movimimentos) {
        movimientosRows.push([
          movimiento.concepto,
          movimiento.fechaVencimiento,
          `AR$ ${this.decimalPipe.transform(movimiento.importeComprobantePesos, '.2')}`,
          `US$ ${this.decimalPipe.transform(movimiento.importeComprobanteDolares, '.2')}`
        ]);
        sumaPesos += movimiento.saldoPesos;
        sumaDolares += movimiento.saldoDolares;
      }
      rows.push(movimientosRows);

      // .. preparar opciones
      let headerCount = 0;
      let movimientosOpciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: 72, halign: 'left' },
          1: { columnWidth: 30, halign: 'center' },
          2: { columnWidth: 40, halign: 'right' },
          3: { columnWidth: 40, halign: 'right' }
        },
        createdHeaderCell: function (cell, data) {
          cell.styles.columnWidth = data.settings.columnStyles[headerCount].columnWidth;
          cell.styles.halign = data.settings.columnStyles[headerCount].halign;
          headerCount++;
        }
      };
      opciones.push(movimientosOpciones);

      // .. columnas
      let movimientosColumnas = ["Concepto", "Fecha", "Pesos", "Dólares"];
      columnas.push(movimientosColumnas);

      // saldos
      if (saldos) {
        // .. preparar datos
        let saldosRow = [];
        saldosRow.push(
          [
            "Saldo en pesos",
            `AR$ ${this.decimalPipe.transform(saldos.saldoPesos, '.2')}`
          ]
        );
        saldosRow.push(
          [
            "Saldo en dólares",
            `US$ ${this.decimalPipe.transform(saldos.saldoDolares, '.2')}`
          ]
        );
        rows.push(saldosRow);

        // .. preparar opciones
        let saldosOpciones = {
          startY: 30,
          columnStyles: {
            0: { columnWidth: '50%', halign: 'left' },
            1: { columnWidth: '50%', halign: 'right' },
          }
        };
        opciones.push(saldosOpciones);

        // .. columnas
        let saldosColumnas = ["Concepto", "Valor"];
        columnas.push(saldosColumnas);
      }

      // Totales
      rows.push([[
        "Totales",
        `AR$ ${this.decimalPipe.transform(sumaPesos, '.2')}`,
        `US$ ${this.decimalPipe.transform(sumaDolares, '.2')}`
      ]]);

      let headerTotalsCount = 0;
      opciones.push({
        startY: 30,
        columnStyles: {
          // fullWidth: 182
          0: { columnWidth: 102, halign: 'left', fontStyle: 'bold' },
          1: { columnWidth: 40, halign: 'right', fontStyle: 'bold' },
          2: { columnWidth: 40, halign: 'right', fontStyle: 'bold' },
        },
        createdHeaderCell: function (cell, data) {
          cell.styles.columnWidth = data.settings.columnStyles[headerTotalsCount].columnWidth;
          cell.styles.halign = data.settings.columnStyles[headerTotalsCount].halign;
          headerTotalsCount++;
        }
      });

      columnas.push(["Resumen", "Pesos", "Dólares"]);

      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        "Movimientos de Cuenta Corriente Aplicada",
        columnas,
        "cuenta-corriente-aplicada",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
