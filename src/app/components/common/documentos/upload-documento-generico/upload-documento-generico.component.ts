import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Documento } from '../../../../interfaces/documentaciones/documento';

@Component({
  selector: 'app-upload-documento-generico',
  templateUrl: './upload-documento-generico.component.html',
  styleUrls: ['./upload-documento-generico.component.css']
})
export class UploadDocumentoGenericoComponent implements OnInit {

  @Input()
  documento: Documento;

  @Output()
  cargaFinalizada: EventEmitter<any> = new EventEmitter<any>();

  nombreArchivo: string;
  porcentajeDeCarga: number = 0;
  leyendaDeCarga: string;
  identificadorArchivo: string;

  constructor() { }

  ngOnInit() {
  }

  actualizarPorcentaje(porcentaje: number) {
    this.porcentajeDeCarga = porcentaje;
  }

  actualizarLeyenda(leyenda: string) {
    this.leyendaDeCarga = leyenda;
  }

  actualizarNombreArchivo(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
  }

  actualizarIdentificadorArchivo(identificador: string) {
    this.documento.archivoId = identificador;
    this.cargaFinalizada.emit();
  }
}