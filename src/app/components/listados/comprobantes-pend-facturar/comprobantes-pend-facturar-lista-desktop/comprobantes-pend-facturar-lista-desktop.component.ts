import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MovimientoComprobantesPendFact } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { CompPendFactExportacionesService } from '../../../../services/comprobantes-pend-facturar/comp-pend-fact-exportaciones.service';
import { ComprobantesPendFacturarItemDesktopComponent } from '../comprobantes-pend-facturar-item-desktop/comprobantes-pend-facturar-item-desktop.component';
import { FiltroComprobantesPendFacturar } from '../../../../interfaces/comprobantes-pend-facturar/filtro-comp-pend-fact';
import { ComprobantesPendFacturarService } from '../../../../services/comprobantes-pend-facturar/comprobantes-pend-facturar.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comprobantes-pend-facturar-lista-desktop',
  templateUrl: './comprobantes-pend-facturar-lista-desktop.component.html',
  styleUrls: ['./comprobantes-pend-facturar-lista-desktop.component.css']
})

export class ComprobantesPendFacturarListaDesktopComponent implements OnInit {

  @Input()
  observerFiltro$: Subject<any>;

  @Input()
  cuenta: string;

  @Input()
  cantidadPorPagina: number = 50;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoComprobantesPendFact> = new EventEmitter<MovimientoComprobantesPendFact>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  compPendFactSeleccionados: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(ComprobantesPendFacturarItemDesktopComponent)
  compPendFactItems: QueryList<ComprobantesPendFacturarItemDesktopComponent>;

  listadoCompPendFact: Array<MovimientoComprobantesPendFact> = [];
  pagina: number = 1;

  cargando: boolean = false;
  filtro: FiltroComprobantesPendFacturar;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private compPendFactService: ComprobantesPendFacturarService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltro$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      filtro => {
        this.filtro = filtro;
        this.cargarListado(true);
      });

    var today = new Date();
    this.observerFiltro$.next({
      cuenta: this.cuenta,
      fechaDesde: "01/01/2018",
      fechaHasta: today.toLocaleDateString()
    });

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      perfil => {
        this.perfilBasico = perfil;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar el listado de comprobantes pendientes de facturar
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;
      this.cargandoChange.emit(true);

      if (limpiar) {
        this.limpiar();
      }

      this.compPendFactService.listadoComprobPendFact(this.filtro).subscribe(respuesta => {
        this.listadoCompPendFact = respuesta.datos.listado ? respuesta.datos.listado : [];

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
    this.listadoCompPendFact.splice(0, this.listadoCompPendFact.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<MovimientoComprobantesPendFact>) {
    movimientos.forEach(
      movimiento => {
        this.listadoCompPendFact.push(movimiento);
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
  verDetalle(movimiento: MovimientoComprobantesPendFact) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Función encargada de crear una lista con las entregas seleccionados
   */
  rearmarListaSeleccionados() {
    if (this.compPendFactItems && this.compPendFactItems.length > 0) {

      let listadoSeleccionados = this.compPendFactItems
        .filter(item => item.seleccionado == true)
        .map(item => {
          return {
            movimiento: item.movimiento
          };
        });

      this.compPendFactSeleccionados.emit(listadoSeleccionados);
    }
  }

  /**
   * Selecciona todos los contratos si corresponde, rearma el listado de descarga
   * @param todos 
   */
  seleccionarTodos(seleccion: boolean) {
    if (this.compPendFactItems && this.compPendFactItems.length > 0) {

      this.compPendFactItems.forEach(item => item.seleccionado = seleccion);
      this.rearmarListaSeleccionados();

    }
  }
}