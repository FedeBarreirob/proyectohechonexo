import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MovimientoMercPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { CompPendFactExportacionesService } from '../../../../services/comprobantes-pend-facturar/comp-pend-fact-exportaciones.service';
import { MercPendEntregarItemDesktopComponent } from '../merc-pend-entregar-item-desktop/merc-pend-entregar-item-desktop.component';
import { FiltroComprobantesPendFacturar } from '../../../../interfaces/comprobantes-pend-facturar/filtro-comp-pend-fact';
import { MercPendEntregarService } from '../../../../services/merc-pend-entregar/merc-pend-entregar.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-merc-pend-entregar-lista-desktop',
  templateUrl: './merc-pend-entregar-lista-desktop.component.html',
  styleUrls: ['./merc-pend-entregar-lista-desktop.component.css']
})

export class MercPendEntregarListaDesktopComponent implements OnInit {

  @Input()
  cuenta: string;

  @Input()
  cantidadPorPagina: number = 50;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoMercPendEntregar> = new EventEmitter<MovimientoMercPendEntregar>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  compPendFactSeleccionados: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(MercPendEntregarItemDesktopComponent)
  compPendFactItems: QueryList<MercPendEntregarItemDesktopComponent>;

  listadoMercPendEntregar: Array<MovimientoMercPendEntregar> = [];
  pagina: number = 1;

  cargando: boolean = false;
  filtro: FiltroComprobantesPendFacturar;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private mercPendEntregarService: MercPendEntregarService,
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

      this.mercPendEntregarService.listadoMercPendEntregar(this.filtro).subscribe(respuesta => {
        this.listadoMercPendEntregar = respuesta.datos.listado;
        if (this.listadoMercPendEntregar.length == 0) {
          this.listadoMercPendEntregar.push({
            seleccionado: false,
            tipoComprobante: "1",
            comprobante: "Mercadería pendiente de entregar 1",
            fecha: new Date(),
            codArticulo: "25896",
            descripcionArticulo: "Articulo de prueba para mercadería",
            cantidad: 1,
            cantidadPendiente: 2,
            moneda: "U$D",
            totalUsd: 250
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
    this.listadoMercPendEntregar.splice(0, this.listadoMercPendEntregar.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<MovimientoMercPendEntregar>) {
    movimientos.forEach(
      movimiento => {
        this.listadoMercPendEntregar.push(movimiento);
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
  verDetalle(movimiento: MovimientoMercPendEntregar) {
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
