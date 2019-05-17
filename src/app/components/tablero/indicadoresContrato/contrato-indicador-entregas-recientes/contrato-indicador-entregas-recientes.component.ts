import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrato-indicador-entregas-recientes',
  templateUrl: './contrato-indicador-entregas-recientes.component.html',
  styleUrls: ['./contrato-indicador-entregas-recientes.component.css'],
  providers: [DatePipe]
})
export class ContratoIndicadorEntregasRecientesComponent implements OnInit {

  observerFiltroListadoMovil$ = new Subject<FiltroEntregas>();

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

    let filtroPorDef: FiltroEntregas = {
      especie: null,
      cosecha: null,
      fechaDesde: this.datePipe.transform(new Date(fechaDesde), 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(new Date(fechaHasta), 'dd/MM/yyyy'),
      cuenta: cuenta,
      agrupadoPorCampo: false,
      paginado: true,
      pagina: 0,// el listado agrega los valores de paginación correctos
      cantPorPagina: 0
    };

    this.observerFiltroListadoMovil$.next(filtroPorDef);
  }

  /**
   * Redirige a la pantalla de entregas
   */
  irAEntregas() {
    this.router.navigate(["entregas"]);
  }
}
