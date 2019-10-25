import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { MovimientoEntrega, EntregasTotales } from '../../interfaces/entregas/listado-entregas';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EntregasExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  // funcion que exporta a excel un movimiento de entrada
  exportarEntregasDetalleExcel(movimiento: MovimientoEntrega) {
    try {
      let listado: Array<MovimientoEntrega> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "entregas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de entregas
  exportarEntregasDetallePDF(movimiento: MovimientoEntrega) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de entregas",
        ["Concepto", "Valor"],
        "entregas-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de entregas
  exportarListadoEntregasDetalleExcel(movimimentos: Array<MovimientoEntrega>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "entregas");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de entregas detalle
  exportarListadoEntregasDetallePDF(movimimentos: Array<MovimientoEntrega>, totales?: EntregasTotales) {
    try {

      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de movimientos
      // .. preparar datos
      let movimientosRows = [];
      for (let movimiento of movimimentos) {
        movimientosRows.push([
          `${movimiento.especie} ${movimiento.cosecha}`,
          movimiento.fecha,
          `${this.decimalPipe.transform(movimiento.kilosBrutos, '.2')} Kg`,
          `${this.decimalPipe.transform(movimiento.kilosNetos, '.2')} Kg`
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
      let movimientosColumnas = ["Especia/Cosecha", "Fecha", "Kg.Brutos", "Kg.Netos"];
      columnas.push(movimientosColumnas);

      // totales
      if (totales) {
        // .. preparar datos
        let totalesRow = [];
        totalesRow.push(
          [
            "Total Kg. Brutos",
            `${this.decimalPipe.transform(totales.totalKgBrutos, '.2')} Kg`
          ]
        );
        totalesRow.push(
          [
            "Total Kg. Humedad",
            `${this.decimalPipe.transform(totales.totalKgHumedad, '.2')} Kg`
          ]
        );
        totalesRow.push(
          [
            "Total Kg. Zarandeo",
            `${this.decimalPipe.transform(totales.totalKgZarandeo, '.2')} Kg`
          ]
        );
        totalesRow.push(
          [
            "Total Kg. Volátil",
            `${this.decimalPipe.transform(totales.totalKgVolatil, '.2')} Kg`
          ]
        );
        totalesRow.push(
          [
            "Total Entregas",
            `${this.decimalPipe.transform(totales.cantidadEntregas, '.0')}`
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
        "Movimientos de entregas",
        columnas,
        "entregas",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
