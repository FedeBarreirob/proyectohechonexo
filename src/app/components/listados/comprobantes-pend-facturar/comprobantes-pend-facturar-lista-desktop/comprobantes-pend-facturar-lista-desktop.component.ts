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
    this.filtro = {
      cuenta: this.cuenta,
      fechaDesde: "01/01/2020",
      fechaHasta: "01/02/2020"
    }
    this.cargarListado(true);

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

  // funcion encargada de cargar el listado de comprobantes pendientes de facturar
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;
      this.cargandoChange.emit(true);

      if (limpiar) {
        this.limpiar();
      }

      this.compPendFactService.listadoComprobPendFact(this.filtro).subscribe(respuesta => {
        this.listadoCompPendFact = respuesta.datos.listado;
        if (this.listadoCompPendFact.length == 0) {
          this.listadoCompPendFact.push({
            tipoComprobante: "1",
            comprobante: "Comprobante pendiente de facturar 1",
            fecha: new Date(),
            codArticulo: "12986",
            descripcionArticulo: "Articulo de prueba para comprobante",
            cantidad: 1,
            cantidadPendiente: 2,
            moneda: "U$D",
            totalUsd: 124
          });
        }

        this.cargando = false;
      }, () => {
        this.cargando = false;
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
        .filter(entregaItem => entregaItem.seleccionado == true)
        .map(entregaItem => {
          return {
            movimiento: entregaItem.movimiento
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

      this.compPendFactItems.forEach(entregaItem => entregaItem.seleccionado = seleccion);
      this.rearmarListaSeleccionados();

    }
  }
}
