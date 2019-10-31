import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { InfoCtaCte } from '../../../../enums/info-cta-cte.enum';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { Subject } from 'rxjs';
import { CtacteService } from '../../../../services/ctacte/ctacte.service';
import { takeUntil } from 'rxjs/operators';
import { FiltroPersonalizadoParaFiltroCtaCte } from '../../../../interfaces/varios/filtro-personalizado-para-filtro-cta-cte';
import { CuentaCorrienteItemDesktopComponent } from '../cuenta-corriente-item-desktop/cuenta-corriente-item-desktop.component';

@Component({
  selector: 'app-cuenta-corriente-lista-desktop',
  templateUrl: './cuenta-corriente-lista-desktop.component.html',
  styleUrls: ['./cuenta-corriente-lista-desktop.component.css']
})
export class CuentaCorrienteListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(CuentaCorrienteItemDesktopComponent)
  ctacteItems: QueryList<CuentaCorrienteItemDesktopComponent>;

  infoCtaCte: any = InfoCtaCte;
  listado: Array<MovimientoCtaCte> = [];
  filtro: any;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  // filtro a utilizar en la barra de filtros de cereales
  filtroPersonalizado: Array<FiltroPersonalizadoParaFiltroCtaCte> = [
    {
      descripcion: "A cobrar",
      filtroAtributo: "aCobrar",
      checkbox: true,
      value: null
    },
    {
      descripcion: "A pagar",
      filtroAtributo: "aPagar",
      checkbox: true,
      value: null
    },
    {
      descripcion: "Vencido",
      filtroAtributo: "vencido",
      checkbox: true,
      value: null
    },
    {
      descripcion: "A Vencer",
      filtroAtributo: "AVencer",
      checkbox: true,
      value: null
    }
  ];

  constructor(private ctacteService: CtacteService) { }

  ngOnInit() {
    this.cargarBotonesExtrasDescarga();
    this.cargarListado();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de ejecutar 
   * @param filtro 
   */
  aplicar(filtro: any) {
    this.filtro = filtro;
    this.cargarListado();
  }

  /**
   * Función encargada de cargar el listado de entregas
   */
  cargarListado() {
    if (!this.cargando) {
      this.cargando = true;

      this.limpiar();

      let filtroPaginado: any = (this.filtro) ? this.filtro : this.filtroPorDefecto();
      filtroPaginado.totales = true;
      filtroPaginado.paginado = false;
      filtroPaginado.ordenado = false;

      this.ctacteService.listadoCtaCte(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          this.listado = respuesta.datos.listado;
          this.cargando = false;
        }, () => {
          this.cargando = false;
        });
    }
  }

  /**
   * Retorna filtro por defecto
   */
  filtroPorDefecto(): any {
    return {
      cuenta: this.cuenta.id.codigo
    };
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.listado.splice(0, this.listado.length);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoCtaCte) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Función encargada de crear una lista con los seleccionados
   */
  rearmarListaSeleccionados() {
    if (this.ctacteItems && this.ctacteItems.length > 0) {

      let listadoSeleccionados = this.ctacteItems
        .filter(ctacteItem => ctacteItem.seleccionado == true)
        .map(ctacteItem => {
          return {
            movimiento: ctacteItem.movimiento
          };
        });

      this.identificadoresParaDescarga = listadoSeleccionados;
    }
  }

  /**
   * Selecciona todos los items si corresponde, rearma el listado de descarga
   * @param todos 
   */
  seleccionarTodos(seleccion: boolean) {
    if (this.ctacteItems && this.ctacteItems.length > 0) {

      this.ctacteItems.forEach(ctacteItem => ctacteItem.seleccionado = seleccion);
      this.rearmarListaSeleccionados();

    }
  }

  /**
   * Función encargada de cargar los botones extras en la barra de descargas
   */
  cargarBotonesExtrasDescarga() {

    this.botonesBarraDescargaExtras.push({
      id: "excel",
      nombre: "Exportar a Excel",
      img: "assets/varios/excel.svg"
    });

    this.botonesBarraDescargaExtras.push({
      id: "pdf",
      nombre: "Exportar a PDF",
      img: "assets/varios/pdf-verde.svg"
    });

  }
}
