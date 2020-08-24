import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EntidadAlg } from '../../../../../interfaces/perfiles/entidad-alg';
import { CtacteAplicadaService } from '../../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { FiltroCtacteAplicada } from '../../../../../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { takeUntil } from 'rxjs/operators';
import { MovimientoCtaCteAplicada } from '../../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-pagar-listado',
  templateUrl: './pagar-listado.component.html',
  styleUrls: ['./pagar-listado.component.css']
})
export class PagarListadoComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Input()
  totalEvent$: BehaviorSubject<number>;

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Input()
  conceptosAPagarSeleccionados$: BehaviorSubject<Array<MovimientoCtaCteAplicada>>;

  @Input()
  conceptosPreviamenteSeleccionados: Array<MovimientoCtaCteAplicada>;

  esCelular: boolean;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  destroyTotalizador$: Subject<any> = new Subject<any>();
  listado: Array<any> = [];
  total: number = 0;
  listadoConceptosSeleccionados: Array<MovimientoCtaCteAplicada> = [];

  constructor(
    private deviceService: DeviceDetectorService,
    private ctacteAplicadaService: CtacteAplicadaService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.conceptosPreviamenteSeleccionados) {
      this.listadoConceptosSeleccionados = this.conceptosPreviamenteSeleccionados;
    }

    if (this.observerFiltro$) {
      this.observerFiltro$
        .subscribe(filtro => this.cargarConceptosAPagar(filtro));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();

    this.destroyTotalizador$.next()
    this.destroyTotalizador$.unsubscribe();
  }

  /**
   * Función encargada de cargar el listado de conceptos a cobrar
   * @param filtro 
   */
  cargarConceptosAPagar(filtro: FiltroCtacteAplicada) {
    if (this.cargando == false && filtro) {
      this.cargando = true;
      this.limpiar();

      this.ctacteAplicadaService.listadoCtaCteFiltrado(filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.listado = respuesta.datos.map(concepto => {
                return {
                  concepto,
                  esConceptoSeleccionado: this.esConceptoSeleccionado(concepto)
                };
              });

              this.actualizarTotalImportesSeleccionados();
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );
    }
  }

  /**
   * Limpia el listado para una nueva búsqueda
   */
  limpiar() {
    this.listado = [];
    //this.listadoConceptosSeleccionados = [];
    //this.total = 0;
    //this.notificarTotal();
  }

  /**
   * Actualiza la seleccion de un concepto y actualizar el totalizador
   * @param conceptoYSuSeleccion 
   */
  seleccionarConcepto(conceptoYSuSeleccion: any) {
    if (conceptoYSuSeleccion.seleccionado == true) {
      this.listadoConceptosSeleccionados.push(conceptoYSuSeleccion.concepto);
    } else {
      this.listadoConceptosSeleccionados = this.listadoConceptosSeleccionados.filter(conceptoSeleccionado => !(conceptoSeleccionado.comprobanteAfectado == conceptoYSuSeleccion.concepto.comprobanteAfectado && conceptoSeleccionado.fechaCtaCte == conceptoYSuSeleccion.concepto.fechaCtaCte));
    }

    this.actualizarTotalImportesSeleccionados();
  }

  /**
   * Verifica si el concepto se encuentra previamente seleccionado
   */
  esConceptoSeleccionado(concepto: any): boolean {
    return this.listadoConceptosSeleccionados.some(conceptoSeleccionado => conceptoSeleccionado.comprobanteAfectado == concepto.comprobanteAfectado && conceptoSeleccionado.fechaCtaCte == concepto.fechaCtaCte);
  }

  /**
   * Actualiza el total segun los conceptos seleccionados, este total lo obtiene del servicio encargado
   * de calcular el total, diferencia de cambio etc
   */
  actualizarTotalImportesSeleccionados() {
    this.conceptosAPagarSeleccionados$.next(this.listadoConceptosSeleccionados);
    this.destroyTotalizador$.next();

    this.ctacteAplicadaService.saldoSegunComprobantes(this.listadoConceptosSeleccionados)
      .pipe(takeUntil(this.destroyTotalizador$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.total = respuesta.datos;
          } else {
            this.total = 0;
          }

          this.notificarTotal();
        },
        error => {
          console.log(error);
          this.total = 0;
          this.notificarTotal();
        });
  }

  /**
   * Función encargada de notificar el nuevo total calculado
   */
  notificarTotal() {
    if (this.totalEvent$) {
      this.totalEvent$.next(this.total);
    }
  }
}
