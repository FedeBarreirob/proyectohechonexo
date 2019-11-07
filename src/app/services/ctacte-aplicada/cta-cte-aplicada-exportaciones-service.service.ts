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
      let movimientosColumnas = ["Concepto", "Fecha", "Pesos", "Dolares"];
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

      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        "Movimientos de cuenta corriente aplicada",
        columnas,
        "cuenta-corriente-aplicada",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
