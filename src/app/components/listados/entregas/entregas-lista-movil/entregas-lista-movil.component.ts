import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
  selector: 'app-entregas-lista-movil',
  templateUrl: './entregas-lista-movil.component.html',
  styleUrls: ['./entregas-lista-movil.component.css']
})
export class EntregasListaMovilComponent implements OnInit {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Input()
  filtrarPorAplicacion: boolean = true;

  @Output()
  seleccionMovimiento: EventEmitter<MovimientoEntrega> = new EventEmitter<MovimientoEntrega>();

  listadoEntregas: Array<MovimientoEntrega> = [];
  pagina: number = 1;
  
  @Input()
  cantidadPorPagina: number = 50;

  cargando: boolean = false;
  filtro: FiltroEntregas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  entregasAplicadas: boolean = null;

  constructor(
    private entregasService: EntregasService,
    private authenticationService: AuthenticationService
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

      let filtroPaginado: FiltroEntregas = this.filtro;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;
      filtroPaginado.aplicado = this.entregasAplicadas;

      this.entregasService.listadoEntregas(filtroPaginado).subscribe(respuesta => {

        if (respuesta.exito == true && respuesta.datos != null) {
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
    this.listadoEntregas.splice(0, this.listadoEntregas.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<MovimientoEntrega>) {
    movimientos.forEach(
      movimiento => {
        this.listadoEntregas.push(movimiento);
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    this.pagina = this.pagina + 1;
    this.cargarListado(false);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Establece el filtro para obtener 
   * @param aplicado Estado del filtro de aplicación
   */
  seleccionarFiltroAplicacion(aplicado?: boolean) {
    this.entregasAplicadas = aplicado;

    if (this.filtro != null) {
      this.cargarListado(true);
    }
  }

  /**
   * Devuelve el nombre del filtro de aplicación según el filtro efectuado
   */
  leyendaFiltroAplicacion(): string {
    if (this.entregasAplicadas == null) {
      return "TODAS";
    } else if (this.entregasAplicadas == false) {
      return "PENDIENTES DE APLICAR";
    } else {
      return "APLICADAS";
    }
  }
}
