import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ventas-lista-movil',
  templateUrl: './ventas-lista-movil.component.html',
  styleUrls: ['./ventas-lista-movil.component.css']
})
export class VentasListaMovilComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Input()
  filtrarPorPesificacion: boolean = true;

  @Output()
  seleccionMovimiento: EventEmitter<FijacionVenta> = new EventEmitter<FijacionVenta>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  listado: Array<FijacionVenta> = [];
  pagina: number = 1;

  @Input()
  cantidadPorPagina: number = 50;

  cargando: boolean = false;
  filtro: FiltroVentas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  ventasPesificadas: boolean = null;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private ventasService: VentasService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltroListadoMovil$
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
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;
      this.cargandoChange.emit(true);

      if (limpiar) {
        this.limpiar();
      }

      let filtroPaginado: FiltroVentas = this.filtro;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;
      filtroPaginado.pesificado = this.ventasPesificadas;

      this.ventasService.listadoVentas(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          if (respuesta.exito == true) {
            this.agregarMovimientosAlListado(respuesta.datos);
          }

          this.cargando = false;
          this.cargandoChange.emit(false);
        }, () => {
          this.cargando = false;
          this.cargandoChange.emit(false);
        });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listado.splice(0, this.listado.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<FijacionVenta>) {
    movimientos.forEach(
      movimiento => {
        this.listado.push(movimiento);
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    this.pagina = this.pagina + 1;
    this.cargarListado(false);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: FijacionVenta) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Establece el filtro para obtener 
   * @param pesificado Estado del filtro de aplicación
   */
  seleccionarFiltroPesificacion(pesificado?: boolean) {
    this.ventasPesificadas = pesificado;

    if (this.filtro != null) {
      this.cargarListado(true);
    }
  }

  /**
   * Devuelve el nombre del filtro de pesificacion según el filtro efectuado
   */
  leyendaFiltroPesificacion(): string {
    if (this.ventasPesificadas == null) {
      return "TODAS";
    } else if (this.ventasPesificadas == false) {
      return "PENDIENTE DE PESIFICAR";
    } else {
      return "PESIFICADO";
    }
  }
}
