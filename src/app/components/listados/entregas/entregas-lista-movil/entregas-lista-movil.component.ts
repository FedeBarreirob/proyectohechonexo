import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-entregas-lista-movil',
  templateUrl: './entregas-lista-movil.component.html',
  styleUrls: ['./entregas-lista-movil.component.css']
})
export class EntregasListaMovilComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Input()
  filtrarPorAplicacion: boolean = true;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  listadoEntregas: Array<MovimientoEntrega> = [];
  pagina: number = 1;

  @Input()
  cantidadPorPagina: number = 50;

  cargando: boolean = false;
  filtro: FiltroEntregas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private entregasService: EntregasService,
    private authenticationService: AuthenticationService
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

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.paginado = true;
      this.filtro.pagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.entregasService.listadoEntregas(this.filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          if (respuesta.exito == true && respuesta.datos != null) {
            this.agregarMovimientosAlListado(respuesta.datos);
          }

          this.cargando = false;
        }, error => {
          this.cargando = false;
        });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listadoEntregas.splice(0, this.listadoEntregas.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<MovimientoEntrega>) {
    movimientos.forEach(
      movimiento => {
        this.listadoEntregas.push(movimiento);
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    this.pagina = this.pagina + 1;
    this.cargarListado(false);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Establece el filtro para obtener 
   * @param aplicado Estado del filtro de aplicación
   */
  seleccionarFiltroAplicacion(aplicado?: boolean) {
    if (this.filtro != null) {
      this.filtro.aplicado = aplicado;
      this.cargarListado(true);
    }
  }

  /**
   * Devuelve el nombre del filtro de aplicación según el filtro efectuado
   */
  leyendaFiltroAplicacion(): string {
    if (this.filtro != null) {

      if (this.filtro.aplicado == null) {
        return "TODAS";
      } else if (this.filtro.aplicado == false) {
        return "PENDIENTES DE APLICAR";
      } else {
        return "APLICADAS";
      }

    } else {
      return "-";
    }
  }
}
