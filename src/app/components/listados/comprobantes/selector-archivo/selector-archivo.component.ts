import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeccionComprobantes } from '../../../../enums/seccion-comprobantes.enum';

@Component({
  selector: 'app-selector-archivo',
  templateUrl: './selector-archivo.component.html',
  styleUrls: ['./selector-archivo.component.css']
})
export class SelectorArchivoComponent implements OnInit {

  constructor() { }

  @Output()
  seleccion: EventEmitter<SeccionComprobantes> = new EventEmitter<SeccionComprobantes>();

  seccionComprobanteSeleccionado: SeccionComprobantes = SeccionComprobantes.COMPROBANTES;
  seccionComprobante: any = SeccionComprobantes;

  ngOnInit() {
  }

  /**
   * Selecciona una sección
   * @param seccion Seccion seleccionada
   */
  seleccionarSeccion(seccion: SeccionComprobantes) {
    this.seccionComprobanteSeleccionado = seccion;
    this.seleccion.emit(this.seccionComprobanteSeleccionado);
  }

  /**
   * Muestra el texto correspondiente a la opción seleccionada
   */
  leyendaFiltro(): string {
    if (this.seccionComprobanteSeleccionado != null) {
      switch (this.seccionComprobanteSeleccionado) {
        case SeccionComprobantes.COMPROBANTES:
          return "COMPROBANTES";
        case SeccionComprobantes.TENENCIAS_IMPOSITIVAS:
          return "TENENCIAS IMPOSITIVAS";
      }
    } else {
      return "-";
    }
  }
}
