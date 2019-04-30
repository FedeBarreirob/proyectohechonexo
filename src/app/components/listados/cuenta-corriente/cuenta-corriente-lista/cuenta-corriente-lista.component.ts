import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { CtacteService } from 'src/app/services/ctacte/ctacte.service';

@Component({
  selector: 'app-cuenta-corriente-lista',
  templateUrl: './cuenta-corriente-lista.component.html',
  styleUrls: ['./cuenta-corriente-lista.component.css']
})
export class CuentaCorrienteListaComponent implements OnInit {

  @Input()
  observerFiltro$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  listado: Array<any> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  cargando: boolean = false;
  filtro: any;

  constructor(
    private ctacteService: CtacteService
  ) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltro$.subscribe(
      filtro => {
        this.filtro = filtro;
        this.cargarListado(true);
      }
    );
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      let filtroPaginado: any = this.filtro;
      filtroPaginado.totales = false;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;

      this.ctacteService.listadoCtaCte(filtroPaginado).subscribe(respuesta => {
        this.agregarMovimientosAlListado(respuesta.datos);
        this.cargando = false;
      }, () => {
        this.cargando = false;
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
