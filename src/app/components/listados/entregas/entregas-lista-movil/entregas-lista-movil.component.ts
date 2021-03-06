import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';
import { EntregasItemMovilComponent } from '../entregas-item-movil/entregas-item-movil.component';

@Component({
  selector: 'app-entregas-lista-movil',
  templateUrl: './entregas-lista-movil.component.html',
  styleUrls: ['./entregas-lista-movil.component.css']
})
export class EntregasListaMovilComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  @Input()
  filtrarPorAplicacion: boolean = true;

  @Input()
  cargarOnScroll: boolean = true;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  listadoEntregas: Array<MovimientoEntrega> = [];
  pagina: number = 1;

  @Input()
  cantidadPorPagina: number = 50;

  cargando: boolean = false;
  filtro: FiltroEntregas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();

  @Output()
  cambioSeleccion: EventEmitter<boolean> = new EventEmitter<boolean>();

  identificadoresParaDescarga: Array<MovimientoEntrega> = [];

  @ViewChildren(EntregasItemMovilComponent)
  entregasItems: QueryList<EntregasItemMovilComponent>;

  @Output()
  exportar: EventEmitter<any> = new EventEmitter<any>();

  mostrarCheck: boolean = false;

  @Input()
  public permitirSeleccion: boolean = false;

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
  cargarListado(limpiar: boolean, borrarSeleccion: boolean = true) {
    if (!this.cargando) {
      this.cargando = true;
      this.cargandoChange.emit(true);

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.paginado = true;
      this.filtro.pagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      if (borrarSeleccion) {
        this.mostrarCheck = false;
        this.identificadoresParaDescarga = [];
        this.entregasItems.forEach(x => { x.seleccionado = false, x.mostrarCheck = false });
      }

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
        }, error => {
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
    if (this.cargando == false && this.cargarOnScroll == true) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false, false);
    }
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

  /**
   * Selecciona todas o ninguna entrega 
   * @param $event 
   */
  seleccionarTodoNada($event: MatCheckboxChange) {
    this.entregasItems.forEach(x => x.seleccionado = $event.checked);
    if ($event.checked) {
      this.identificadoresParaDescarga = this.listadoEntregas;
    }
    else {
      this.identificadoresParaDescarga = [];
      this.mostrarCheck = false;
      this.entregasItems.forEach(x => x.mostrarCheck = false);
    }
  }

  /**
   * Selecciona todas o ninguna entrega 
   * @param $event 
   */
  cambioSeleccionSimple(checked: boolean, movimiento: MovimientoEntrega) {
    if (checked) {
      this.identificadoresParaDescarga.push(movimiento);
    }
    else {
      this.identificadoresParaDescarga = this.identificadoresParaDescarga.filter(x => x.comprobante != movimiento.comprobante);
      if (this.identificadoresParaDescarga.length == 0) {
        this.mostrarCheck = false;
        this.entregasItems.forEach(x => x.mostrarCheck = false);
      }
    }
  }

  /**
   * Exporta datos seleccionados 
   * @param tipo 
   */
  exportarDatos(tipo: string) {
    this.exportar.emit({ tipo: tipo, datos: this.identificadoresParaDescarga});
  }

  /**
   * Mostrar check 
   * @param movimiento
   */
  mostrarCheckFunc(movimiento: MovimientoEntrega) {
    this.mostrarCheck = true;
    this.entregasItems.forEach(x => x.mostrarCheck = true);
    this.identificadoresParaDescarga.push(movimiento);
  }

  /**
   * Cancelar seleccion 
   */
  cancelarSeleccion() {
    this.mostrarCheck = false;
    this.entregasItems.forEach(x => { x.mostrarCheck = false, x.seleccionado = false });
    this.identificadoresParaDescarga = [];
  }
}
