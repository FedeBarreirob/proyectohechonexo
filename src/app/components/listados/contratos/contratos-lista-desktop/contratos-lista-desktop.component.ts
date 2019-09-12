import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { FiltroResumenContratoCompraVenta } from '../../../../interfaces/contratos/filtro-resumen-contrato-compra-venta';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { ContratosDataSource } from '../../../../datasources/contratos-data-source';

@Component({
  selector: 'app-contratos-lista-desktop',
  templateUrl: './contratos-lista-desktop.component.html',
  styleUrls: ['./contratos-lista-desktop.component.css']
})
export class ContratosListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<ResumenContratoCompraVenta> = new EventEmitter<ResumenContratoCompraVenta>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  listadoContratos: Array<ResumenContratoCompraVenta> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 20;
  cargando: boolean = false;
  filtro: FiltroResumenContratoCompraVenta;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();
  contratosDataSource: ContratosDataSource;

  constructor(
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService
  ) {
    this.contratosDataSource = new ContratosDataSource(contratosService);
  }

  ngOnInit() {
    this.agregarNuevosMovimientosAlListado();

    // observer del filtro
    this.observerFiltro$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        filtro => {
          this.filtro = filtro;
          this.cargarListado(true);
        }
      );

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarUnidadMedida()
        });

    this.cargarUnidadMedida();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.contratosDataSource.disconnect(null);
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado(limpiar: boolean) {

    if (limpiar) {
      this.limpiar();
    }

    let filtroPaginado: FiltroResumenContratoCompraVenta = this.filtro;
    filtroPaginado.paginado = true;
    filtroPaginado.pagina = this.pagina;
    filtroPaginado.cantPorPagina = this.cantidadPorPagina;

    this.contratosDataSource.load(filtroPaginado);
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listadoContratos.splice(0, this.listadoContratos.length);
  }

  /**
   * Función encargada de cargar los movimientos cuando estos estén disponibles
   */
  private agregarNuevosMovimientosAlListado() {
    this.contratosDataSource.connect(null).subscribe(
      movimientos => {
        movimientos.forEach(
          movimiento => {
            this.listadoContratos.push(movimiento);
          }
        );
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: ResumenContratoCompraVenta) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Establece el filtro para obtener 
   * @param cumplido Estado del filtro de cumplido
   */
  seleccionarFiltroCumplido(cumplido?: boolean) {
    if (this.filtro != null) {
      if (this.filtro.cumplido != cumplido) {
        this.filtro.cumplido = cumplido;
        this.cargarListado(true);
      }
    }
  }

  /**
   * Devuelve el nombre del filtro de cumplido según el filtro efectuado
   */
  leyendaFiltroCumplido(): string {
    if (this.filtro != null) {

      if (this.filtro.cumplido == null) {
        return "TODOS";
      } else if (this.filtro.cumplido == false) {
        return "PENDIENTES";
      } else {
        return "CUMPLIDOS";
      }

    } else {
      return "-";
    }
  }
}
