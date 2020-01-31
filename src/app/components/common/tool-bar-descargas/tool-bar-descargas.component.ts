import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-tool-bar-descargas',
  templateUrl: './tool-bar-descargas.component.html',
  styleUrls: ['./tool-bar-descargas.component.css']
})
export class ToolBarDescargasComponent implements OnInit {

  @Input()
  disabled: boolean = false;

  @Input()
  botonesExtras: Array<any>;

  @Output()
  descargarComprobanteChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  botonPresionado: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  mostrarDescargarComprobante: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Notifica que se debe iniciar la descarga
   */
  descargarComprobante() {
    this.descargarComprobanteChange.emit();
  }

  /**
   * Notifica que se ha presionado un botón extra
   * @param botonId 
   */
  notificarBotonPresionado(botonId: any) {
    this.botonPresionado.emit(botonId);
  }
}
