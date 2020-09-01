import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Documento } from '../../../../interfaces/documentaciones/documento';

@Component({
  selector: 'app-progress-upload-files',
  templateUrl: './progress-upload-files.component.html',
  styleUrls: ['./progress-upload-files.component.css']
})
export class ProgressUploadFilesComponent implements OnInit {

  @Input()
  documentacion$: Subject<Array<Documento>>;

  porcentual: number = 0;
  documentosPorCargar: number = 0;

  constructor() { }

  ngOnInit() {
    if (this.documentacion$) {
      this.documentacion$.subscribe(
        documentacion => this.actualizarIndicadorDeCarga(documentacion)
      );
    }
  }

  /**
   * Actualiza en indicador de carga
   * @param documentacion 
   */
  actualizarIndicadorDeCarga(documentacion: Array<Documento>) {
    if (documentacion && documentacion.length > 0) {

      let totalCargado: number = documentacion.filter(doc => doc.archivoId).length;
      let totalDocumentos: number = documentacion.length;

      if (totalDocumentos != 0) {
        this.porcentual = totalCargado * 100 / totalDocumentos;
        this.documentosPorCargar = totalDocumentos - totalCargado;
      } else {
        this.porcentual = 0;
        this.documentosPorCargar = 0;
      }

    } else {
      this.porcentual = 0;
      this.documentosPorCargar = 0;
    }
  }
}
