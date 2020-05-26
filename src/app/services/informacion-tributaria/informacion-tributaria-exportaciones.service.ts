import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { TenenciaImpositiva } from '../../interfaces/informacion-tributaria/tenencia-impositiva/tenencia-impositiva';
import { SaldoCtaCte } from '../../interfaces/informacion-tributaria/tenencia-impositiva/saldo-cta-cte';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InformacionTributariaExportacionesService {

  constructor(
    private excelService: ExcelService,
    private pdfService: PdfService,
    private decimalPipe: DecimalPipe
  ) { }

  /**
   * Exporta a excel el reporte de tenencias impositivas a archivo de Excel
   * @param tenenciaImpositiva 
   */
  exportarTenenciasImpositivaAExcel(tenenciaImpositiva: TenenciaImpositiva, fecha: string) {
    try {
      let saldo: Array<SaldoCtaCte> = [];
      saldo.push(tenenciaImpositiva.saldoCtaCte);

      let sheets: any[] = [tenenciaImpositiva.stocksGranosNoLiquidadosDTO, saldo];
      let textoEncabezado: string[] = [`Stk de gran.no.liq. ${fecha}`, `Saldos de ctacte - ${fecha}`];

      this.excelService.exportAsExcelFileMultipleSheet(sheets, textoEncabezado, "tenencias_impositivas");
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Exporta a excel el reporte de tenencias impositivas a archivo de PDF
   * @param tenenciaImpositiva 
   */
  exportarTenenciasImpositivaAPDF(tenenciaImpositiva: TenenciaImpositiva, fecha: string) {
    try {
      let rows = [];
      let opciones = [];
      let columnas = [];

      // listado de stock de granos no liquidados
      // .. preparar datos
      let stockGranosNoLiquidadosRows = [];
      if (tenenciaImpositiva.stocksGranosNoLiquidadosDTO && tenenciaImpositiva.stocksGranosNoLiquidadosDTO.length > 0) {
        for (let stock of tenenciaImpositiva.stocksGranosNoLiquidadosDTO) {

          stockGranosNoLiquidadosRows.push([
            stock.especie,
            stock.cosecha,
            this.decimalPipe.transform(stock.kgNetos, '.0-0'),
            this.decimalPipe.transform(stock.kgPendCertificar, '.0-0')
          ]);

        }
      }
      rows.push(stockGranosNoLiquidadosRows);

      // .. preparar opciones
      let stockGranosNoLiquidadosOpciones = {
        startY: 30,
        columnStyles: {
          0: { columnWidth: '25%', halign: 'left' },
          1: { columnWidth: '25%', halign: 'left' },
          2: { columnWidth: '25%', halign: 'right' },
          3: { columnWidth: '25%', halign: 'right' }
        }
      };
      opciones.push(stockGranosNoLiquidadosOpciones);

      // .. columnas
      let stockGranosNoLiquidadosColumnas = ["Especie", "Cosecha", "Kg.Netos", "Kg.Pend.Cert."];
      columnas.push(stockGranosNoLiquidadosColumnas);

      // saldos
      // .. preparar datos
      let saldosRow = [];
      saldosRow.push(
        [
          "Saldo en pesos",
          `AR$ ${this.decimalPipe.transform(tenenciaImpositiva.saldoCtaCte.saldoPesos, '.2-2')}`
        ]
      );
      saldosRow.push(
        [
          "Saldo en dólares",
          `US$ ${this.decimalPipe.transform(tenenciaImpositiva.saldoCtaCte.saldoDolar, '.2-2')}`
        ]
      );
      saldosRow.push(
        [
          "Saldo en contable",
          `AR$ ${this.decimalPipe.transform(tenenciaImpositiva.saldoCtaCte.saldoContable * -1, '.2-2')}`
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

      // renderizar
      this.pdfService.listaMultipleAPdf(
        rows,
        `Reporte de Tenencias Impositivas - ${fecha}`,
        columnas,
        "reporte-tenencias-impositivas",
        opciones
      );
    } catch (e) {
      console.log(e);
    }
  }
}
