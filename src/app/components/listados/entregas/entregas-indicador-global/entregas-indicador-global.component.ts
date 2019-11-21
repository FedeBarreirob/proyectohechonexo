import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IndicadorGlobalEntregas } from '../../../../interfaces/entregas/indicador-global-entregas';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
  selector: 'app-entregas-indicador-global',
  templateUrl: './entregas-indicador-global.component.html',
  styleUrls: ['./entregas-indicador-global.component.css']
})
export class EntregasIndicadorGlobalComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  indicadorGlobal: IndicadorGlobalEntregas;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  pactadasTitulo: string = "Pactadas";
  descargadasTitulo: string = "Descargadas";
  aplicadasTitulo: string = "Aplicadas";

  constructor(
    private entregasService: EntregasService,
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
  cargarIndicadores(filtro: FiltroEntregas) {
    this.destroy$.next();
    this.cargando = true;

    this.entregasService.indicadorGlobal(filtro)
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
