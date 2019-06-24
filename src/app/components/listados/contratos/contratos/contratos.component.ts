import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { Subject } from 'rxjs';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContratosDetalleComponent } from '../contratos-detalle/contratos-detalle.component';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit, OnDestroy {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  public filtrosEspecieCosecha: FiltroEspecieCosecha;
  public cargandoFiltros: boolean;
  cargando$: Subject<boolean> = new Subject<boolean>();

  observerFiltroListadoMovil$ = new Subject<any>();
  observerFiltroListadoDesktop$ = new Subject<any>();
  esCelular: boolean;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private contratosService: ContratosService,
    private dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = true;//this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          if (!this.cuenta || (this.cuenta && this.cuenta.id.codigo != cuentaAlg.id.codigo)) {
            this.seleccionarCuenta(cuentaAlg);
            this.cargarListadoPorDefecto();
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
  cargarFiltrosEspecieCosecha() {
    if (!this.cargandoFiltros) {
      this.cargandoFiltros = true;

      let codigoEntidad = (this.cuenta) ? this.cuenta.id.codigo : null;

      this.contratosService.listadoFiltrosEspecieCosecha(codigoEntidad)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.filtrosEspecieCosecha = respuesta;
            this.cargandoFiltros = false;
          }, () => { console.log("error"); this.cargandoFiltros = true; }
        );
    }
  }

  // funcion que ejecuta la carga del listado de entregas
  cargarListado(filtro: any) {
    if (this.esCelular) {
      this.observerFiltroListadoMovil$.next(filtro);
    } else {
      this.observerFiltroListadoDesktop$.next(filtro);
    }
  }

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
    this.cuenta = cuentaSeleccionada;
    this.cargarFiltrosEspecieCosecha();
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: ResumenContratoCompraVenta) {
    let opciones;
    if (this.esCelular) {
      opciones = {
        data: movimiento,
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      };
    } else {
      opciones = {
        data: movimiento,
        height: '90%',
        width: '500px'
      };
    }

    this.dialog.open(ContratosDetalleComponent, opciones);
  }

  /**
   * Arma un filtro por defecto y ejecuta el listado
   */
  cargarListadoPorDefecto() {
    let filtro = {
      cuenta: this.cuenta.id.codigo,
      fechaDesde: null,
      fechaHasta: null,
      especie: null,
      cosecha: null
    }

    this.cargarListado(filtro);
  }

  /**
	 * Muestra el indicador de carga mientras haya un proceso ejecutándose
	 */
	mostrarIndicadorLoading(cargando: boolean) {
		if (cargando == true) {
			this.cargando$.next(true);
		} else {
			this.cargando$.next(false);
		}
	}
}
