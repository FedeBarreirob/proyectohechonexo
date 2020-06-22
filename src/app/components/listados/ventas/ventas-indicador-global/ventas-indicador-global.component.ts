import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ContratosTotalesGlobal } from '../../../../interfaces/contratos/indicadores-globales/contratos-totales-global';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ventas-indicador-global',
  templateUrl: './ventas-indicador-global.component.html',
  styleUrls: ['./ventas-indicador-global.component.css']
})
export class VentasIndicadorGlobalComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  indicadorGlobal: ContratosTotalesGlobal;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.observerFiltro$
      .subscribe(
        filtro => this.cargarIndicadores(filtro)
      );

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarUnidadMedida()
        });

    this.cargarUnidadMedida();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cargar los datos de los indicadores
   * @param filtro 
   */
  cargarIndicadores(filtro: FiltroVentas) {
    this.destroy$.next();
    this.cargando = true;

    this.contratosService.indicadoresGlobalVentas(filtro)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {

          if (respuesta.exito == true) {
            this.indicadorGlobal = respuesta.datos;
          }
        },
        error => console.log(error),
        () => this.cargando = false);
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    } else {
      this.perfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }
}
