import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { Subject } from 'rxjs';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContratosDetalleComponent } from '../contratos-detalle/contratos-detalle.component';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  public filtrosEspecieCosecha: FiltroEspecieCosecha;
  public cargandoFiltros: boolean;

  observerFiltroListadoMovil$ = new Subject<any>();
  observerFiltroListadoDesktop$ = new Subject<any>();
  esCelular: boolean;

  constructor(
    private contratosService: ContratosService,
    private dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.seleccionarCuenta(cuentaAlg)
    );
  }

  // funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
  cargarFiltrosEspecieCosecha() {
    if (!this.cargandoFiltros) {
      this.cargandoFiltros = true;

      let codigoEntidad = (this.cuenta) ? this.cuenta.id.codigo : null;

      this.contratosService.listadoFiltrosEspecieCosecha(codigoEntidad).subscribe(
        respuesta => {
          this.filtrosEspecieCosecha = respuesta;
          this.cargandoFiltros = false;

          this.cargarListadoPorDefecto();
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
   * Cuando es ejecutado, debe haber una cuenta seleccionada y los filtros de especie cosechas obtenidos
   */
  cargarListadoPorDefecto() {
    if (this.filtrosEspecieCosecha != null && this.filtrosEspecieCosecha.cosechas != null && this.filtrosEspecieCosecha.cosechas.length > 0) {
      // obtener la ultima cosecha
      let ultimaCosecha = this.filtrosEspecieCosecha.cosechas[0];
      let filtro = {
        cuenta: this.cuenta.id.codigo,
        fechaDesde: null,
        fechaHasta: null,
        especie: null,
        cosecha: ultimaCosecha.cosecha
      }

      this.cargarListado(filtro);
    }
  }
}
