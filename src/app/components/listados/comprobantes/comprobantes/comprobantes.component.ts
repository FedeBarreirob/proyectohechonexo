import { Component, OnInit, ViewChild } from '@angular/core';
import { SeccionComprobantes } from '../../../../enums/seccion-comprobantes.enum';
import { MatSidenav } from '@angular/material';
import { EntidadAlg } from 'src/app/interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from 'src/app/services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { FiltroCtaCteComprobanteDescarga } from 'src/app/interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css']
})
export class ComprobantesComponent implements OnInit {

  @ViewChild('menuFiltro')
  sidenav: MatSidenav;

  cuenta: EntidadAlg;
  filtroArchivosComprobantes$: Subject<FiltroCtaCteComprobanteDescarga> = new Subject<FiltroCtaCteComprobanteDescarga>();

  constructor(private cuentasService: CuentaAlgService) { }

  seccionComprobanteSeleccionado: SeccionComprobantes;
  seccionComprobante: any = SeccionComprobantes;

  ngOnInit() {
    this.seccionComprobanteSeleccionado = SeccionComprobantes.COMPROBANTES;

    this.cuentasService.cuentaSeleccionada$.subscribe(
      cuenta => this.cuenta = cuenta
    );
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

  /**
   * Notifica que se debe cargar el listado de comprobantes a descargar
   * @param filtro Filtro para la busqueda de comprobantes
   */
  cargarListadoArchivosComprobantes(filtro: FiltroCtaCteComprobanteDescarga) {
    this.filtroArchivosComprobantes$.next(filtro);
  }
}
