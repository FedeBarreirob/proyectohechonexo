import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoCtaCte, SaldosTotales } from '../../interfaces/ctacte/listado.ctacte';

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
          movimiento.importeComprobantePesos,
          movimiento.importeComprobanteDolares
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
      // .. preparar datos
      let saldosRow = [];
      saldosRow.push(["Saldo en pesos", saldos.saldoPesos]);
      saldosRow.push(["Saldo en dólares", saldos.saldoDolares]);
      saldosRow.push(["Saldo en contable", saldos.saldoContable]);
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

      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        "Movimientos de cuenta corriente",
        columnas,
        "cuenta-corriente",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
