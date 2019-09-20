import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contrato-indicador-ventas-recientes',
  templateUrl: './contrato-indicador-ventas-recientes.component.html',
  styleUrls: ['./contrato-indicador-ventas-recientes.component.css'],
  providers: [DatePipe]
})
export class ContratoIndicadorVentasRecientesComponent implements OnInit, OnDestroy {

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  observerFiltro$ = new Subject<FiltroVentas>();
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private cuentaAlgService: CuentaAlgService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cargarListado(cuenta.id.codigo);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga el listado con los ultimos movimientos
   * @param cuenta Identificador de la cuenta del cliente
   */
  cargarListado(cuenta: string) {

    let filtroPorDef: FiltroVentas = {
      especie: null,
      cosecha: null,
      fechaDesde: null,
      fechaHasta: null,
      cuenta: cuenta,
      paginado: true,
      pagina: 0,// el listado agrega los valores de paginación correctos
      cantPorPagina: 0
    };

    this.observerFiltro$.next(filtroPorDef);
  }

  /**
   * Redirige a la pantalla de ventas
   */
  irAVentas() {
    this.router.navigate(["ventas"]);
  }

  /**
   * Actualiza el estado de carga según el estado del listado
   * @param cargando Indica el estado de carga
   */
  cargandoListado(cargando: boolean) {
    this.cargandoChange.emit(cargando);
  }
}
