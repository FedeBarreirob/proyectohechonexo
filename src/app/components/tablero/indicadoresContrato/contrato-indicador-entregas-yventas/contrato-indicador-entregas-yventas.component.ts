import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ContratosTotalesPorEspecie } from '../../../../interfaces/contratos/indicadores/contratos-totales-por-especie';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { MatDialog } from '@angular/material';
import { FiltroCosechaComponent } from '../../../../components/filtros/filtro-cosecha/filtro-cosecha.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contrato-indicador-entregas-yventas',
  templateUrl: './contrato-indicador-entregas-yventas.component.html',
  styleUrls: ['./contrato-indicador-entregas-yventas.component.css']
})
export class ContratoIndicadorEntregasYVentasComponent implements OnInit, OnDestroy {

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  resumenDeContratos: ContratosTotalesPorEspecie;
  cargando: boolean = false;
  unidadMedida: string;
  destroy$: Subject<any> = new Subject<any>();
  cargandoFiltrosCosecha: boolean = false;
  filtrosEspecieCosecha: FiltroEspecieCosecha;
  cuenta: string;
  cosecha: string;
  descripcionFiltroCosecha: string;
  esCelular: boolean;

  constructor(
    private contratosService: ContratosService,
    private cuentasService: CuentaAlgService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.cargarUnidadMedida();

    this.cuentasService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cuenta = cuenta.id.codigo;
          this.cargarFiltrosCosecha(cuenta.id.codigo);
          this.cargarIndicadores(cuenta.id.codigo);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que carga la unidad de medida desde el perfil
   */
  private cargarUnidadMedida() {
    let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
    if (perfilBasico) {
      this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  /**
   * Función encagada de cargar los filtros de cosecha
   */
  cargarFiltrosCosecha(cuenta: string) {
    if (this.cargandoFiltrosCosecha == false) {
      this.cargandoFiltrosCosecha = true;

      this.contratosService.listadoFiltrosEspecieCosecha(cuenta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          resultado => {
            this.filtrosEspecieCosecha = resultado;
            this.cargandoFiltrosCosecha = false;
          },
          error => {
            console.log(error);
            this.cargandoFiltrosCosecha = false;
          }
        );
    }
  }

  /**
   * Función encargada de cargar los indicadores
   */
  private cargarIndicadores(cuenta: string, cosecha?: string) {

    if (this.cargando == false) {

      this.cargando = true;
      this.cargandoChange.emit(true);

      let paramCosecha = cosecha && cosecha != "" ? cosecha : null;

      this.contratosService.indicadoresPorEspecie(cuenta, paramCosecha)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.resumenDeContratos = respuesta.datos;
            }

            this.actualizarCosechaFiltradaDescripcion();
            this.cargando = false;
            this.cargandoChange.emit(false);
          },
          error => {
            console.log(error);
            this.actualizarCosechaFiltradaDescripcion();
            this.cargando = false;
            this.cargandoChange.emit(false);
          }
        );
    }
  }

  /**
   * Muestra el filtro de cosechas
   */
  verFiltroCosecha() {

    let opciones;

    if (this.esCelular) {
      opciones = {
        data: this.filtrosEspecieCosecha,
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      };
    } else {
      opciones = {
        data: this.filtrosEspecieCosecha
      };
    }

    let dialogRef = this.dialog.open(FiltroCosechaComponent, opciones);

    dialogRef.afterClosed().subscribe(
      respuesta => {
        if (respuesta != null) {
          this.cosecha = respuesta;
          this.cargarIndicadores(this.cuenta, respuesta);
        }
      }
    );
  }

  /**
   * Actualiza la descripción del filtro que se esta utilizando para filtrar los indicadores
   */
  actualizarCosechaFiltradaDescripcion() {
    if (this.cosecha && this.cosecha != "") {
      this.descripcionFiltroCosecha = `COSECHA ${this.cosecha}`;
    } else {
      this.descripcionFiltroCosecha = "COSECHA 1718 EN ADELANTE";
    }
  }
}
