import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta-corriente-aplicada-lista',
  templateUrl: './cuenta-corriente-aplicada-lista.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-lista.component.css']
})
export class CuentaCorrienteAplicadaListaComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  @Output()
  seEncuentraCargando: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  listado: Array<any> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  filtro: any;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  // filtros extendidos
  aCobrar: boolean = false;
  aPagar: boolean = false;
  vencido: boolean = false;
  AVencer: boolean = false;

  constructor(
    private ctacteAplicadaService: CtacteAplicadaService
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;
      this.seEncuentraCargando.next(true);

      if (limpiar) {
        this.limpiar();
      }

      let filtroPaginado: any = this.filtro;
      filtroPaginado.totales = false;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;
      filtroPaginado.ordenado = true;
      filtroPaginado.aCobrar = this.aCobrar;
      filtroPaginado.aPagar = this.aPagar;
      filtroPaginado.vencido = this.vencido;
      filtroPaginado.AVencer = this.AVencer;

      this.ctacteAplicadaService.listadoCtaCte(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          this.agregarMovimientosAlListado(respuesta.datos);
          this.cargando = false;
          this.seEncuentraCargando.next(false);
        }, () => {
          this.cargando = false;
          this.seEncuentraCargando.next(false);
        });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listado.splice(0, this.listado.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<any>) {
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
  verDetalle(movimiento: any) {
    this.seleccionMovimiento.emit(movimiento);
  }
}
