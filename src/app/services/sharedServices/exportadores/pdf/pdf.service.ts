import { Injectable } from '@angular/core';
import { DownloaderUtilService } from '../../downloader/downloader-util.service';
import { environment } from '../../../../../environments/environment';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
declare let jsPDF;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private downloaderUtilService: DownloaderUtilService,
    private cuentaAlgService: CuentaAlgService) { }

  // funcion encargada de generar un pdf a partir de un objeto
  objetoAPdf(objeto: any, titulo: string, columnas: Array<string>, nombreArchivo: string, opcionesExtras: any = null) {
    try {
      var img = new Image();
      var downloaderUtilService = this.downloaderUtilService;
      var cuenta = this.cuentaAlgService.cuentaPreviamenteSeleccionada;
      img.onload = function () {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text(10, 25, titulo);
        pdf.setFontSize(10);
        pdf.text(100, 10, (cuenta.id.codigo + " - " + cuenta.nombre));

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
        // Firma de Gaviglio por pagina
        opciones.addPageContent = function (data) { pdf.addImage(img, 'PNG', 10, 5, 40, 10, 'Gaviglio') };
        opciones.margin = { top: 20 };
        pdf.autoTable(columnas, rows, opciones);

        // descargar
        if (environment.inPhonegap) {
          downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
        } else {
          pdf.save(`${nombreArchivo}.pdf`);
        }
      };
      img.src = "assets/logo.png"; // Firma de gaviglio (Logo de App)
    } catch (e) {
      console.log(e);
    }
  }

  // funcion encargada de generar un pdf a partir de una lista de objetos
  listaAPdf(lista: Array<any>, titulo: string, columnas: Array<string>, nombreArchivo: string, opcionesExtras: any = null) {
    try {
      var img = new Image();
      var downloaderUtilService = this.downloaderUtilService;
      var cuenta = this.cuentaAlgService.cuentaPreviamenteSeleccionada;
      img.onload = function () {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text(10, 25, titulo);
        pdf.setFontSize(10);
        pdf.text(100, 10, (cuenta.id.codigo + " - " + cuenta.nombre));

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
        // Firma de Gaviglio por pagina
        opciones.addPageContent = function (data) { pdf.addImage(img, 'PNG', 10, 5, 40, 10, 'Gaviglio') };
        opciones.margin = { top: 20 };
        pdf.autoTable(columnas, lista, opciones);

        // descargar
        if (environment.inPhonegap) {
          downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
        } else {
          pdf.save(`${nombreArchivo}.pdf`);
        }
      };
      img.src = "assets/logo.png"; // Firma de gaviglio (Logo de App)
    } catch (e) {
      console.log(e);
    }
  }

  // funcion encargada de generar un pdf a partir de una lista multiple de objetos
  // cada elemento en la lista es otra lista y se corresponde con las opciones y las columnas
  listaMultipleAPdf(lista: Array<any>, titulo: string, columnasTablas: Array<string>, nombreArchivo: string, opcionesExtras: Array<any>) {
    try {
      var img = new Image();
      var downloaderUtilService = this.downloaderUtilService;
      var cuenta = this.cuentaAlgService.cuentaPreviamenteSeleccionada;
      img.onload = function () {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text(10, 25, titulo);
        pdf.setFontSize(10);
        pdf.text(100, 10, (cuenta.id.codigo + " - " + cuenta.nombre));

        for (let i = 0; i < lista.length; i++) {
          let rows = lista[i];
          let opciones = opcionesExtras[i];
          let columnas = columnasTablas[i];

          // agregar un espacio a la tabla
          if (i > 0) {
            opciones.startY = pdf.autoTable.previous.finalY + 10;
            opciones.pageBreak = 'avoid';
          }

          // Firma de Gaviglio por pagina
          opciones.addPageContent = function (data) { pdf.addImage(img, 'PNG', 10, 5, 40, 10, 'Gaviglio') };
          opciones.margin = { top: 20};
          pdf.autoTable(columnas, rows, opciones);
        }

        // descargar
        if (environment.inPhonegap) {
          downloaderUtilService.download(`${nombreArchivo}.pdf`, pdf.output('blob'), 'application/pdf');
        } else {
          pdf.save(`${nombreArchivo}.pdf`);
        }
      };
      img.src = "assets/logo.png"; // Firma de gaviglio (Logo de App)
    } catch (e) {
      console.log(e);
    }
  }
}
