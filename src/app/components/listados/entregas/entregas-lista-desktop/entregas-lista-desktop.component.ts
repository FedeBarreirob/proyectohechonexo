import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoEntregaAgrupadoPorCampo, EntregasTotales, MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { MatDialog } from '@angular/material';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { EntregasDetalleComponent } from '../entregas-detalle/entregas-detalle.component';
import { EntregasMasOperacionesComponent } from '../entregas-mas-operaciones/entregas-mas-operaciones.component';

@Component({
  selector: 'app-entregas-lista-desktop',
  templateUrl: './entregas-lista-desktop.component.html',
  styleUrls: ['./entregas-lista-desktop.component.css']
})
export class EntregasListaDesktopComponent implements OnInit {

  @Input()
  observerFiltroListadoDesktop$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  perfilBasico: PerfilBasico;
  filtro: FiltroEntregas;
  cargando: boolean = false;
  listadoEntregasAgrupadasPorCampo: Array<MovimientoEntregaAgrupadoPorCampo>;
  totales: EntregasTotales = null;
  unidadMedida: string;

  constructor(
    private entregasService: EntregasService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // observer de filtro
    this.observerFiltroListadoDesktop$.subscribe(
      filtro => {
        this.filtro = filtro;
        this.cargarListado();
      }
    );

    // observer de perfil
    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
        this.cargarUnidadMedida()
      });

    this.cargarUnidadMedida();
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado() {
    if (!this.cargando) {
      this.cargando = true;
      this.limpiar();

      let filtroAgrupado: FiltroEntregas = this.filtro;
      filtroAgrupado.agrupadoPorCampo = true;
      filtroAgrupado.paginado = false;

      return this.entregasService.listadoEntregas(filtroAgrupado).subscribe(respuesta => {
        this.listadoEntregasAgrupadasPorCampo = respuesta.datos.listadoAgrupadoPorCampo;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion encargada de limpiar para nueva generacion
  limpiar() {
    this.listadoEntregasAgrupadasPorCampo = [];
    this.totales = null;
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {
    this.seleccionMovimiento.emit(movimiento);
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(EntregasMasOperacionesComponent, {
      data: {
        movimientos: this.listadoEntregasAgrupadasPorCampo,
        totales: this.totales
      }
    });
  }
}
