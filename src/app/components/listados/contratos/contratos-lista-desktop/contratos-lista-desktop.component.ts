import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { FiltroResumenContratoCompraVenta } from '../../../../interfaces/contratos/filtro-resumen-contrato-compra-venta';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contratos-lista-desktop',
  templateUrl: './contratos-lista-desktop.component.html',
  styleUrls: ['./contratos-lista-desktop.component.css']
})
export class ContratosListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltroListadoMovil$: Subject<any>;

  @Output()
  seleccionMovimiento: EventEmitter<ResumenContratoCompraVenta> = new EventEmitter<ResumenContratoCompraVenta>();

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  listadoContratos: Array<ResumenContratoCompraVenta> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 20;
  cargando: boolean = false;
  filtro: FiltroResumenContratoCompraVenta;
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltroListadoMovil$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        filtro => {
          this.filtro = filtro;
          //this.cargarListado(true);
        }
      );

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          //this.cargarUnidadMedida()
        });

    this.cargarUnidadMedida();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }
}
