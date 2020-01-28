import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoCtaCte, SaldosTotales } from '../../interfaces/ctacte/listado.ctacte';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CtaCteExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe) { }

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
  exportarListadoMovCtaCteDetallePDF(movimimentos: Array<MovimientoCtaCte>, saldos: SaldosTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      for (let movimiento of movimimentos) {
        movimientosRows.push([
          movimiento.concepto,
          movimiento.fechaVencimiento,
          `AR$ ${this.decimalPipe.transform(movimiento.importeComprobantePesos, '.2')}`,
          `US$ ${this.decimalPipe.transform(movimiento.importeComprobanteDolares, '.2')}`
        ]);
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
        saldosRow.push(
          [
            "Saldo en contable",
            `AR$ ${this.decimalPipe.transform(saldos.saldoContable, '.2')}`
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
      
      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        "Movimientos de Cuenta Corriente",
        columnas,
        "cuenta-corriente",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
