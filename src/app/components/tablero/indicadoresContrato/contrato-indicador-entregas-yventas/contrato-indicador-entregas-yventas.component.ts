import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContratosTotalesPorEspecie } from '../../../../interfaces/contratos/indicadores/contratos-totales-por-especie';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contrato-indicador-entregas-yventas',
  templateUrl: './contrato-indicador-entregas-yventas.component.html',
  styleUrls: ['./contrato-indicador-entregas-yventas.component.css']
})
export class ContratoIndicadorEntregasYVentasComponent implements OnInit, OnDestroy {

  resumenDeContratos: ContratosTotalesPorEspecie;
  cargando: boolean = false;
  unidadMedida: string;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private contratosService: ContratosService,
    private cuentasService: CuentaAlgService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.cargarUnidadMedida();
    this.cuentasService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => this.cargarIndicadores(cuenta.id.codigo)
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
   * Función encargada de cargar los indicadores
   */
  private cargarIndicadores(cuenta: string) {

    if (this.cargando == false) {

      this.cargando = true;

      this.contratosService.indicadoresPorEspecie(cuenta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.resumenDeContratos = respuesta.datos;
            }

            this.cargando = false;
          },
          error => {
            console.log(error);
            this.cargando = false;
          }
        );
    }
  }

}
