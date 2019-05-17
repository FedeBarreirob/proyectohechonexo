import { Component, OnInit } from '@angular/core';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';

@Component({
  selector: 'app-contrato-indicador-ventas-recientes',
  templateUrl: './contrato-indicador-ventas-recientes.component.html',
  styleUrls: ['./contrato-indicador-ventas-recientes.component.css'],
  providers: [DatePipe]
})
export class ContratoIndicadorVentasRecientesComponent implements OnInit {

  observerFiltroListadoMovil$ = new Subject<FiltroVentas>();

  constructor(
    private cuentaAlgService: CuentaAlgService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuenta => {
        this.cargarListado(cuenta.id.codigo);
      }
    );
  }

  /**
   * Carga el listado con los ultimos movimientos
   * @param cuenta Identificador de la cuenta del cliente
   */
  cargarListado(cuenta: string) {

    let sieteDiasAtras: Date = new Date();
    sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);
    let fechaDesde = sieteDiasAtras.toISOString();
    let fechaHasta = (new Date()).toISOString();

    let filtroPorDef: FiltroVentas = {
      especie: null,
      cosecha: null,
      fechaDesde: this.datePipe.transform(new Date(fechaDesde), 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(new Date(fechaHasta), 'dd/MM/yyyy'),
      cuenta: cuenta,
      paginado: true,
      pagina: 0,// el listado agrega los valores de paginación correctos
      cantPorPagina: 0
    };

    this.observerFiltroListadoMovil$.next(filtroPorDef);
  }

  /**
   * Redirige a la pantalla de ventas
   */
  irAVentas() {
    this.router.navigate(["ventas"]);
  }
}
