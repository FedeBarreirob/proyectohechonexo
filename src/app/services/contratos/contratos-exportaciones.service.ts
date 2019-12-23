import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { ContratosTotales } from '../../interfaces/contratos/listado-contratos';
import { DecimalPipe } from '@angular/common';
import { ResumenContratoCompraVenta } from '../../interfaces/contratos/resumen-contrato-compra-venta';

@Injectable({
  providedIn: 'root'
})
export class ContratosExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  // funcion que exporta a excel un movimiento de entrada
  exportarContratosDetalleExcel(movimiento: ResumenContratoCompraVenta) {
    try {
      let listado: Array<ResumenContratoCompraVenta> = [];
      listado.push(movimiento);

      this.excelService.exportAsExcelFile(listado, "contratos");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de contratos
  exportarContratosDetallePDF(movimiento: ResumenContratoCompraVenta) {
    try {
      this.pdfService.objetoAPdf(
        movimiento,
        "Detalle de movimiento de contratos",
        ["Concepto", "Valor"],
        "contratos-detalle"
      );
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a excel un listado movimiento de Contratos
  exportarListadoContratosDetalleExcel(movimimentos: Array<ResumenContratoCompraVenta>) {
    try {
      this.excelService.exportAsExcelFile(movimimentos, "contratos");
    } catch (e) {
      console.log(e);
    }
  }

  // funcion que exporta a pdf un movimiento de Contratos detalle
  exportarListadoContratosDetallePDF(movimimentos: Array<ResumenContratoCompraVenta>, totales?: ContratosTotales) {
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
          movimiento.fechaVenta,
          `${this.decimalPipe.transform(movimiento.kilosFijados, '.2')} Kg`,
          `${this.decimalPipe.transform(movimiento.kilosAFijar, '.2')} Kg`
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
            "Total Contratos",
            `${this.decimalPipe.transform(totales.cantidadContratos, '.0')}`
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
        "Movimientos de Contratos",
        columnas,
        "Contratos",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
