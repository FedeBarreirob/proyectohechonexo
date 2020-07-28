import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FinanzasProgramadorPagosService } from '../../../../services/finanzas/finanzas-programador-pagos.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { FiltroListadoSolicitudes } from '../../../../interfaces/finanzas/filtro-listado-solicitudes';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gestion-de-solicitudes-listado',
  templateUrl: './gestion-de-solicitudes-listado.component.html',
  styleUrls: ['./gestion-de-solicitudes-listado.component.css']
})
export class GestionDeSolicitudesListadoComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: BehaviorSubject<FiltroListadoSolicitudes>;

  listado: Array<any> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  cargando: boolean = false;
  filtro: FiltroListadoSolicitudes;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private finanzasProgramadorPagosService: FinanzasProgramadorPagosService) { }

  ngOnInit() {
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

  /**
   * Función encargada de limpiar 
   */
  private limpiar() {
    this.pagina = 1;
    this.listado.splice(0, this.listado.length);
  }

  /**
   * Función encargada de agregar los movimientos al listado 
   * @param movimientos 
   */
  private agregarMovimientosAlListado(movimientos: Array<any>) {
    movimientos.forEach(
      movimiento => {
        this.listado.push(movimiento);
      }
    );
  }

  /**
   * Función encargada de cargar el listado 
   * @param limpiar 
   * @param borrarSeleccion 
   */
  cargarListado(limpiar: boolean, borrarSeleccion: boolean = true) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.numeroPagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.finanzasProgramadorPagosService.listadoSolicitudes(this.filtro)
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
        }, error => {
          this.cargando = false;
        });
    }
  }

  /**
   * Carga una página de datos 
   */
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false, false);
    }
  }
}
