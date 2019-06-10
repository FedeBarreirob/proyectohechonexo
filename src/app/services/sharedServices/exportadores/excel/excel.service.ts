import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * Exporta el contenido de un objeto a archivo excel
   * @param json Representación de listado de objetos a volcar en una hoja
   * @param excelFileName Nombre del archivo resultante
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  /**
   * Exporta varios objetos json en multiples paginas a archivo excel
   * @param sheets Paginas que contiene un listado de json cada una
   * @param excelFileName 
   * @param hojaNombres array con los nombres de las hojas
   */
  public exportAsExcelFileMultipleSheet(sheets: Array<any[]>, hojaNombres: string[], excelFileName: string): void {

    if (sheets != null && sheets.length > 0) {

      let infoSheet = {};

      sheets.forEach(
        (item, index) => {
          let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(item);
          infoSheet[hojaNombres[index]] = worksheet;
        }
      );

      const workbook: XLSX.WorkBook = { Sheets: infoSheet, SheetNames: hojaNombres };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  }

  /**
   * Escribe el contenido en un archivo
   * @param buffer 
   * @param fileName 
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
