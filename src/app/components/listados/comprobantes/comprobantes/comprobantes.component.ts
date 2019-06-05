import { Component, OnInit, ViewChild } from '@angular/core';
import { SeccionComprobantes } from '../../../../enums/seccion-comprobantes.enum';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css']
})
export class ComprobantesComponent implements OnInit {

  @ViewChild('menuFiltro')
  public sidenav: MatSidenav;

  constructor() { }

  seccionComprobanteSeleccionado: SeccionComprobantes;
  seccionComprobante: any = SeccionComprobantes;

  ngOnInit() {
    this.seccionComprobanteSeleccionado = SeccionComprobantes.COMPROBANTES;
  }

  /**
   * Muestra la seccion indicada
   * @param seccion Seccion a mostrar
   */
  seleccionarSeccion(seccion: SeccionComprobantes) {
    this.seccionComprobanteSeleccionado = seccion;
  }

  /**
   * Muestra u oculta el panel de filtros
   */
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }
}
