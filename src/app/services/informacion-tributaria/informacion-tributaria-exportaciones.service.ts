import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { TenenciaImpositiva } from '../../interfaces/informacion-tributaria/tenencia-impositiva/tenencia-impositiva';
import { SaldoCtaCte } from '../../interfaces/informacion-tributaria/tenencia-impositiva/saldo-cta-cte';

@Injectable({
  providedIn: 'root'
})
export class InformacionTributariaExportacionesService {

  constructor(
    private excelService: ExcelService
  ) { }

  /**
   * Exporta a excel el reporte de tenencias impositivas
   * @param tenenciaImpositiva 
   */
  exportarTenenciasImpositiva(tenenciaImpositiva: TenenciaImpositiva) {
    try {
      let saldo: Array<SaldoCtaCte> = [];
      saldo.push(tenenciaImpositiva.saldoCtaCte);

      let sheets: any[] = [tenenciaImpositiva.stocksGranosNoLiquidadosDTO, saldo];
      let textoEncabezado: string[] = ["Stock de granos no liquidados", "Saldos de cuenta corriente"];
      
      this.excelService.exportAsExcelFileMultipleSheet(sheets, textoEncabezado, "tenencias_impositivas");
    } catch (e) {
      console.log(e);
    }
  }
}
