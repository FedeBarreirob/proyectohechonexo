import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
  selector: 'app-ventas-lista-movil',
  templateUrl: './ventas-lista-movil.component.html',
  styleUrls: ['./ventas-lista-movil.component.css']
})
export class VentasListaMovilComponent implements OnInit {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoVenta> = new EventEmitter<MovimientoVenta>();

  listado: Array<MovimientoVenta> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  cargando: boolean = false;
  filtro: FiltroVentas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private ventasService: VentasService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltroListadoMovil$.subscribe(
      filtro => {
        this.filtro = filtro;
        this.cargarListado(true);
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
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      let filtroPaginado: FiltroVentas = this.filtro;
      filtroPaginado.totales = false;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;

      this.ventasService.listadoVentas(filtroPaginado).subscribe(respuesta => {

        if(respuesta.exito == true) {
          this.agregarMovimientosAlListado(respuesta.datos);
        }

        this.cargando = false;
      }, error => {
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
  private agregarMovimientosAlListado(movimientos: Array<MovimientoVenta>) {
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
  verDetalle(movimiento: MovimientoVenta) {
    this.seleccionMovimiento.emit(movimiento);
  }
}
