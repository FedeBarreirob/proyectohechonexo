import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CuentaCorrienteDetalleComponent } from '../cuenta-corriente-detalle/cuenta-corriente-detalle.component';
import { MonedaService } from '../../../../services/moneda/moneda.service';

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
  cargando$: Subject<boolean> = new Subject<boolean>();
  destroy$: Subject<any> = new Subject<any>();
  cargandoCotizacionMoneda: Boolean = false;
  cotizacionMoneda: number;

  constructor(
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private monedaService: MonedaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          if (!this.cuenta || (this.cuenta && this.cuenta.id.codigo != cuentaAlg.id.codigo)) {
            this.seleccionarCuenta(cuentaAlg);
            this.cargarCotizacionMoneda();
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

  /**
   * Carga la cotización del dolar de hoy
   */
  private cargarCotizacionMoneda() {
    if (this.cargandoCotizacionMoneda == false) {
      this.cargandoCotizacionMoneda = true;
      this.mostrarIndicadorLoading();

      this.monedaService.cotizacionHoy('D')
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.cotizacionMoneda = respuesta.datos;
            } else {
              this.cotizacionMoneda = null;
            }

            this.cargandoCotizacionMoneda = false;
            this.mostrarIndicadorLoading();
          },
          error => {
            console.log(error);
            this.cargandoCotizacionMoneda = false;
            this.mostrarIndicadorLoading();
          }
        );
    }
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
    this.mostrarIndicadorLoading();
  }

  /**
   * Cambia el estado de cargando para el listado de ctacte aplicado
   * @param cargando Indica el estado de cargando
   */
  cambiarEstadoCargandoCtaCteAplicado(cargando: boolean) {
    this.cargandoCtaCteAplicada = cargando;
    this.mostrarIndicadorLoading();
  }

  /**
   * Carga el filtro por defecto, no se indica rango de fecha, tomará la correspondiente al ejercicio
   * @param cuenta Identificador del productor
   */
  private filtroPorDefecto(cuenta: string): any {
    return {
      cuenta: cuenta,
      fechaDesde: null,
      fechaHasta: null,
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
    if (this.cotizacionMoneda != null) {
      this.dialog.open(CuentaCorrienteDetalleComponent, {
        data: {
          movimiento: movimiento,
          tc: this.cotizacionMoneda
        },
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      });
    } else {
      this.openSnackBar("No se ha cargado la cotización del dólar de hoy, intente mas tarde.");
    }
  }

  /**
   * Muestra una notificación
   * @param message Mensaje a mostrar
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Muestra el indicador de carga mientras haya un proceso ejecutándose
   */
  private mostrarIndicadorLoading() {

    let hayProcesosEnEjecucion = this.cargandoCtaCte == true ||
      this.cargandoCtaCteAplicada == true || this.cargandoCotizacionMoneda == true;

    if (hayProcesosEnEjecucion == true) {
      this.cargando$.next(true);
    } else {
      this.cargando$.next(false);
    }
  }
}
