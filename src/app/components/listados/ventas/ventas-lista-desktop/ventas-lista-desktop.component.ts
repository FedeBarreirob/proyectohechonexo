import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MovimientoVenta, VentasTotales } from '../../../../interfaces/ventas/listado-ventas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { MatDialog } from '@angular/material';
import { VentasMasOperacionesComponent } from '../ventas-mas-operaciones/ventas-mas-operaciones.component';

@Component({
  selector: 'app-ventas-lista-desktop',
  templateUrl: './ventas-lista-desktop.component.html',
  styleUrls: ['./ventas-lista-desktop.component.css']
})
export class VentasListaDesktopComponent implements OnInit {

  @Input()
  observerFiltroListadoDesktop$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoVenta> = new EventEmitter<MovimientoVenta>();

  perfilBasico: PerfilBasico;
  filtro: FiltroVentas;
  cargando: boolean = false;
  listado: Array<MovimientoVenta>;
  totales: VentasTotales = null;
  unidadMedida: string;

  constructor(
    private ventasService: VentasService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
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

      let filtroConTotales: FiltroVentas = this.filtro;
      filtroConTotales.totales = true;
      filtroConTotales.paginado = false;

      this.ventasService.listadoVentas(filtroConTotales).subscribe(respuesta => {
        this.listado = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, () => {
        this.cargando = false;
      });
    }
  }

  // funcion encargada de limpiar para nueva generacion
  limpiar() {
    this.listado = [];
    this.totales = null;
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoVenta) {
    this.seleccionMovimiento.emit(movimiento);
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(VentasMasOperacionesComponent, {
      data: {
        movimientos: this.listado,
        totales: this.totales
      }
    });
  }
}
