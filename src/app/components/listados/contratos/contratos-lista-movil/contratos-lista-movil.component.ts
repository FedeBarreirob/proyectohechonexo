import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { Subject } from 'rxjs';
import { FiltroResumenContratoCompraVenta } from '../../../../interfaces/contratos/filtro-resumen-contrato-compra-venta';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
  selector: 'app-contratos-lista-movil',
  templateUrl: './contratos-lista-movil.component.html',
  styleUrls: ['./contratos-lista-movil.component.css']
})
export class ContratosListaMovilComponent implements OnInit {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<ResumenContratoCompraVenta> = new EventEmitter<ResumenContratoCompraVenta>();

  listadoContratos: Array<ResumenContratoCompraVenta> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  cargando: boolean = false;
  filtro: FiltroResumenContratoCompraVenta;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private contratosService: ContratosService,
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

      let filtroPaginado: FiltroResumenContratoCompraVenta = this.filtro;
      filtroPaginado.paginado = true;
      filtroPaginado.pagina = this.pagina;
      filtroPaginado.cantPorPagina = this.cantidadPorPagina;

      this.contratosService.listadoContratosResumidos(filtroPaginado).subscribe(respuesta => {
        this.agregarMovimientosAlListado(respuesta.datos);

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listadoContratos.splice(0, this.listadoContratos.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<ResumenContratoCompraVenta>) {
    movimientos.forEach(
      movimiento => {
        this.listadoContratos.push(movimiento);
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    this.pagina = this.pagina + 1;
    this.cargarListado(false);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: ResumenContratoCompraVenta) {
    this.seleccionMovimiento.emit(movimiento);
  }
}
