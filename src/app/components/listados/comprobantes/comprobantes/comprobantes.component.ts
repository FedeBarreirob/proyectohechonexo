import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FiltroComprobanteDescarga } from '../../../../interfaces/archivo-de-comprobantes/filtro-comprobante-descarga';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css']
})
export class ComprobantesComponent implements OnInit, AfterViewInit {

  @ViewChild('menuFiltro')
  sidenav: MatSidenav;

  cuenta: EntidadAlg;
  filtroArchivosComprobantes$: Subject<FiltroComprobanteDescarga> = new Subject<FiltroComprobanteDescarga>();
  esCelular: boolean;

  constructor(
    private cuentasService: CuentaAlgService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentasService.cuentaSeleccionada$.subscribe(
      cuenta => this.cuenta = cuenta
    );
  }

  ngAfterViewInit(): void {
    if (this.cuentasService.cuentaPreviamenteSeleccionada && !this.esCelular) {
      this.cuenta = this.cuentasService.cuentaPreviamenteSeleccionada;
    }
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
  cargarListadoArchivosComprobantes(filtro: FiltroComprobanteDescarga) {
    this.filtroArchivosComprobantes$.next(filtro);
  }
}
