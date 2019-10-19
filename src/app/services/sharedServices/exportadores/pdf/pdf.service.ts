import { Injectable } from '@angular/core';
import { DownloaderUtilService } from '../../downloader/downloader-util.service';
import { environment } from '../../../../../environments/environment';
declare let jsPDF;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private downloaderUtilService: DownloaderUtilService) { }

  // funcion encargada de generar un pdf a partir de un objeto
  objetoAPdf(objeto: any, titulo: string, columnas: Array<string>, nombreArchivo: string, opcionesExtras: any = null) {
    try {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.text(10, 25, titulo);

      // convertir objeto a array 
      let rows = [];
      for (let celdaKey of Object.keys(objeto)) {
        let valor = (objeto[celdaKey] != null) ? objeto[celdaKey] : '';
        rows.push([celdaKey, valor]);
      }

      // opciones
      let opciones = null;
      if (opcionesExtras == null) {
        opciones = {
          startY: 30,
          columnStyles: {
            0: { columnWidth: '50%', halign: 'left' },
            1: { columnWidth: '50%', halign: 'right' }
          }
        };
      } else {
        opciones = opcionesExtras;
      }

      // renderizar
      pdf.autoTable(columnas, rows, opciones);

      // descargar
      if (environment.inPhonegap) {
        this.downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
      } else {
        pdf.save(`${nombreArchivo}.pdf`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // funcion encargada de generar un pdf a partir de una lista de objetos
  listaAPdf(lista: Array<any>, titulo: string, columnas: Array<string>, nombreArchivo: string, opcionesExtras: any = null) {
    try {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.text(10, 25, titulo);

      // opciones
      let opciones = null;
      if (opcionesExtras == null) {
        opciones = {
          startY: 30,
          columnStyles: {
            0: { columnWidth: '50%', halign: 'left' },
            1: { columnWidth: '50%', halign: 'right' }
          }
        };
      } else {
        opciones = opcionesExtras;
      }

      // renderizar
      pdf.autoTable(columnas, lista, opciones);

      // descargar
      if (environment.inPhonegap) {
        this.downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
      } else {
        pdf.save(`${nombreArchivo}.pdf`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // funcion encargada de generar un pdf a partir de una lista multiple de objetos
  // cada elemento en la lista es otra lista y se corresponde con las opciones y las columnas
  listaMultipleAPdf(lista: Array<any>, titulo: string, columnasTablas: Array<string>, nombreArchivo: string, opcionesExtras: Array<any>) {
    try {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.text(10, 25, titulo);

      for (let i = 0; i < lista.length; i++) {
        let rows = lista[i];
        let opciones = opcionesExtras[i];
        let columnas = columnasTablas[i];

        // agregar un espacio a la tabla
        if (i > 0) {
          opciones.startY = pdf.autoTable.previous.finalY + 10;
          opciones.pageBreak = 'avoid';
        }

        pdf.autoTable(columnas, rows, opciones);
      }

      // descargar
      if (environment.inPhonegap) {
        this.downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
      } else {
        pdf.save(`${nombreArchivo}.pdf`);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
