import { Component, OnInit } from '@angular/core';
import { GrupoDeDocumentaciones } from '../../../../../enums/grupo-de-documentaciones.enum';

@Component({
  selector: 'app-documentacion-requerida',
  templateUrl: './documentacion-requerida.component.html',
  styleUrls: ['./documentacion-requerida.component.css']
})
export class DocumentacionRequeridaComponent implements OnInit {

  grupoDeDocumentaciones: GrupoDeDocumentaciones = GrupoDeDocumentaciones.ALTA_LIMITE_DE_CREDITO;

  constructor() { }

  ngOnInit() {
  }

  registroEjecutado(esCargaCompleta: boolean) {
    console.log(esCargaCompleta);
  }
}
