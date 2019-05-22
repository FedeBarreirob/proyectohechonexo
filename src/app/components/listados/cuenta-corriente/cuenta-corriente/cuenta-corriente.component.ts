import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CuentaCorrienteDetalleComponent } from '../cuenta-corriente-detalle/cuenta-corriente-detalle.component';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.css'],
  providers: [DatePipe]
})
export class CuentaCorrienteComponent implements OnInit, OnDestroy {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  esCelular: boolean;
  observerFiltro$ = new Subject<any>();
  cargandoCtaCte: Boolean = false;
  cargandoCtaCteAplicada: Boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          if (!this.cuenta || (this.cuenta && this.cuenta.id.codigo != cuentaAlg.id.codigo)) {
            this.seleccionarCuenta(cuentaAlg);
            this.cargarListado(this.filtroPorDefecto(cuentaAlg.id.codigo));
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
    this.cuenta = cuentaSeleccionada;
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que ejecuta la carga del listado
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  /**
   * Cambia el estado de cargando para el listado de ctacte
   * @param cargando Indica el estado de cargando
   */
  cambiarEstadoCargandoCtaCte(cargando: boolean) {
    this.cargandoCtaCte = cargando;
  }

  /**
   * Cambia el estado de cargando para el listado de ctacte aplicado
   * @param cargando Indica el estado de cargando
   */
  cambiarEstadoCargandoCtaCteAplicado(cargando: boolean) {
    this.cargandoCtaCteAplicada = cargando;
  }

  /**
   * Carga el filtro por defecto el cual indica como rango de fecha 01-01-2000 - hoy
   * @param cuenta Identificador del productor
   */
  private filtroPorDefecto(cuenta: string): any {
    let fechaDesde = this.datePipe.transform(new Date(2000, 1), 'dd/MM/yyyy');
    let fechaHasta = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

    return {
      cuenta: cuenta,
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      totales: false,
      paginado: true,
      ordenado: true
    }
  }

  /**
   * Función encargada de abrir el dialogo con el detalle del movimiento
   * @param movimiento Movimiento seleccionado
   */
  verDetalle(movimiento: any) {
    this.dialog.open(CuentaCorrienteDetalleComponent, {
      data: movimiento,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }
}
