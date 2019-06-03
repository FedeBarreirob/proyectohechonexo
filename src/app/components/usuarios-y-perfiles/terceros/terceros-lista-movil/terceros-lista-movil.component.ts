import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { FiltroGenericoListaConFiltroId } from '../../../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { Subject } from 'rxjs';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-terceros-lista-movil',
  templateUrl: './terceros-lista-movil.component.html',
  styleUrls: ['./terceros-lista-movil.component.css']
})
export class TercerosListaMovilComponent implements OnInit, OnDestroy {

  @Output()
  clickVerEditar: EventEmitter<TerceroBasico> = new EventEmitter<TerceroBasico>();

  @Output()
  clickHabilitacion: EventEmitter<TerceroBasico> = new EventEmitter<TerceroBasico>();

  @Output()
  clickAgregar: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  observerListado$: Subject<void>;

  listadoTerceros: Array<TerceroBasico> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  filtro: FiltroGenericoListaConFiltroId = {
    filtro: "",
    numeroPagina: 1,
    cantPorPagina: 25,
    filtroId: 0
  };
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;

  constructor(
    private terceroService: TercerosService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.cargando = false;

    this.authenticationService._perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfilActivo => {
          this.filtro.filtroId = perfilActivo.informacionPersonal.id;
          this.cargarListado(true);
        }
      );

    if (this.observerListado$) {
      this.observerListado$.pipe(takeUntil(this.destroy$)).subscribe(
        () => this.cargarListado(true)
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cargar los accesos a terceros
   */
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.numeroPagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.terceroService.listadoPaginado(this.filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          if (respuesta.exito == true && respuesta.datos != null) {
            this.agregarMovimientosAlListado(respuesta.datos.listado);
          }

          this.cargando = false;
        }, error => {
          this.cargando = false;
        });
    }
  }

  /**
   * Función encargada de limpiar para nueva generacion de listado
   */
  private limpiar() {
    this.pagina = 1;
    this.listadoTerceros.splice(0, this.listadoTerceros.length);
  }

  /**
   * Función encargada de agregar la paginas de datos recuperados al listado
   * @param movimientos movimientos a agregar
   */
  private agregarMovimientosAlListado(movimientos: Array<TerceroBasico>) {
    movimientos.forEach(
      movimiento => {
        this.listadoTerceros.push(movimiento);
      }
    );
  }

  /**
   * Función que carga mas datos cuando hace scroll
   */
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }

  /**
   * Notifica que se ha seleccionado un tercero para ver o editar
   * @param tercero Tercero a ver o editar
   */
  verEditar(tercero: TerceroBasico) {
    this.clickVerEditar.emit(tercero);
  }

	/**
   * Función que notifica un tercero con su estado de habilitación a asignarle
   * @param tercero 
   * @param $event 
   */
  habilitacion(tercero: TerceroBasico, $event: MatSlideToggleChange) {
    tercero.credencial.baja = !$event.checked;
    this.clickHabilitacion.emit(tercero);
  }

  /**
   * Notifica que se debe mostrar un modal para agregar un tercero
   */
  agregarTercero() {
    this.clickAgregar.emit();
  }
}
