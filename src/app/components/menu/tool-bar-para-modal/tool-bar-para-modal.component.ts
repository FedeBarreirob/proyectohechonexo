import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-bar-para-modal',
  templateUrl: './tool-bar-para-modal.component.html',
  styleUrls: ['./tool-bar-para-modal.component.css']
})
export class ToolBarParaModalComponent implements OnInit {

  @Input()
  titulo: string = "titulo";

  @Input()
  urlImagenDerechoIzquierdo: string;

  @Input()
  colorIndicador: string = "#666666";

  @Output()
  botonSalirEjecutado: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  botonPersonalizadoDerechoEjecutado: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  // funcion que notifica la ejecucion del boton salir
  salir() {
    this.botonSalirEjecutado.emit(null);
  }

  // funcion que notifica la ejecucion del boton derecho
  ejecutarBotonDerechoPersonalizado() {
    this.botonPersonalizadoDerechoEjecutado.emit(null);
  }

}
