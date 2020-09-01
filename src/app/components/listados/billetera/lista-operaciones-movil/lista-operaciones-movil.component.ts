import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FinanzasProgramadorCobrosService } from '../../../../services/finanzas/finanzas-programador-cobros.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PrevisionDeCobroEstado } from '../../../../enums/prevision-de-cobro-estado.enum';

@Component({
  selector: 'app-lista-operaciones-movil',
  templateUrl: './lista-operaciones-movil.component.html',
  styleUrls: ['./lista-operaciones-movil.component.css']
})
export class ListaOperacionesMovilComponent implements OnInit, OnDestroy {

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  previsionEstado = PrevisionDeCobroEstado;

  ultimasPrevisiones: Array<any>;
  CANTIDAD_MAXIMA_PREVISIONES_A_MOSTRAR = 10;

  constructor(
    private finanzasProgramadorCobrosService: FinanzasProgramadorCobrosService,
    private cuentaService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.cuentaService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => this.cargarUltimasPrevisiones(cuenta.id.codigo)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga las ultimas previsiones
   * @param cuenta 
   */
  cargarUltimasPrevisiones(cuenta: string) {
    if (this.cargando == false) {
      this.cargando = true;

      this.finanzasProgramadorCobrosService
        .ultimasPrevisionesRegistradas(cuenta, this.CANTIDAD_MAXIMA_PREVISIONES_A_MOSTRAR)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.ultimasPrevisiones = respuesta.datos.map(prevision => this.previsionAMostrar(prevision));
            }
          }, error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false);
    }
  }

  /**
   * Acomoda los datos para mostrarlos en pantalla
   * @param prevision 
   */
  previsionAMostrar(prevision: any) {
    let estadoDenominacion;
    switch (prevision.estado) {
      case PrevisionDeCobroEstado.PENDIENTE_DE_APROBACION:
        estadoDenominacion = "Pedt. de aprobación";
        break;

      case PrevisionDeCobroEstado.APROBADO:
        estadoDenominacion = "Aprobado";
        break;

      case PrevisionDeCobroEstado.OPERACION_EJECUTADA:
        estadoDenominacion = "Operación ejecutada";
        break;

      case PrevisionDeCobroEstado.RECHAZADA:
        estadoDenominacion = "Rechazada";
        break;

      default:
        estadoDenominacion = null;
    }

    return {
      fechaDeCobro: prevision.fechaDeCobro,
      importeACobrarPesos: prevision.importeACobrarPesos,
      estado: prevision.estado,
      estadoDenominacion
    };
  }
}
