import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { EntregasItemDesktopComponent } from '../entregas-item-desktop/entregas-item-desktop.component';

@Component({
  selector: 'app-entregas-lista-desktop',
  templateUrl: './entregas-lista-desktop.component.html',
  styleUrls: ['./entregas-lista-desktop.component.css']
})
export class EntregasListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  @Input()
  cantidadPorPagina: number = 50;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  entregasSeleccionados: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(EntregasItemDesktopComponent)
  entregasItems: QueryList<EntregasItemDesktopComponent>;

  listadoEntregas: Array<MovimientoEntrega> = [];
  pagina: number = 1;

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
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    } else {
      this.perfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
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

      this.filtro.paginado = true;
      this.filtro.pagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.entregasService.listadoEntregas(this.filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          // si no hay datos, reestablecer la pagina
          if (respuesta.datos == null || respuesta.datos.length == 0) {
            this.pagina = this.pagina - 1;
          }

          if (respuesta.exito == true && respuesta.datos != null) {
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
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Función encargada de crear una lista con las entregas seleccionados
   */
  rearmarListaSeleccionados() {
    if (this.entregasItems && this.entregasItems.length > 0) {

      let listadoSeleccionados = this.entregasItems
        .filter(entregaItem => entregaItem.seleccionado == true)
        .map(entregaItem => {
          return {
            identificadorParaDescarga: {
              nroCertificado: entregaItem.movimiento.n1116A
            }
          };
        });

      this.entregasSeleccionados.emit(listadoSeleccionados);
    }
  }

  /**
   * Selecciona todos los contratos si corresponde, rearma el listado de descarga
   * @param todos 
   */
  seleccionarTodos(seleccion: boolean) {
    if (this.entregasItems && this.entregasItems.length > 0) {

      this.entregasItems.forEach(entregaItem => entregaItem.seleccionado = seleccion);
      this.rearmarListaSeleccionados();

    }
  }
}
