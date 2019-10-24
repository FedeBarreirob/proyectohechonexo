import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar-descargas',
  templateUrl: './tool-bar-descargas.component.html',
  styleUrls: ['./tool-bar-descargas.component.css']
})
export class ToolBarDescargasComponent implements OnInit {

  @Output()
  descargarComprobanteChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Notifica que se debe iniciar la descarga
   */
  descargarComprobante() {
    this.descargarComprobanteChange.emit();
  }
}
