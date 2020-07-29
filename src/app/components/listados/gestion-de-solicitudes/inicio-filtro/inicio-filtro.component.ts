import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FinanzasProgramadorPagosService } from '../../../../services/finanzas/finanzas-programador-pagos.service';
import { takeUntil } from 'rxjs/operators';
import { Especie } from '../../../../interfaces/varios/especie';
import { PerfilBasicoInfoPersonal } from '../../../../interfaces/perfiles/perfil-basico-informacion-personal';
import { DatePipe } from '@angular/common';
import { FiltroListadoSolicitudes } from '../../../../interfaces/finanzas/filtro-listado-solicitudes';

@Component({
  selector: 'app-inicio-filtro',
  templateUrl: './inicio-filtro.component.html',
  styleUrls: ['./inicio-filtro.component.css'],
  providers: [DatePipe]
})
export class InicioFiltroComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: BehaviorSubject<FiltroListadoSolicitudes>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  especies: Array<Especie>;
  especieIdSeleccionado: number;
  fechaDeSolicitud: string;
  perfilBasicoInfoPersonalSeleccionado: PerfilBasicoInfoPersonal;
  clearAll$: Subject<any> = new Subject<any>();

  estadoSeleccionado: number;
  estados = [
    {
      descripcion: "Pendientes",
      value: 1
    },
    {
      descripcion: "Finalizadas",
      value: 2
    }
  ];

  metodos = [
    {
      descripcion: "Fijación",
      value: 1
    },
    {
      descripcion: "Pesificación",
      value: 2
    }
  ];
  metodoSeleccionado: number;

  constructor(
    private finanzasProgramadorPagosService: FinanzasProgramadorPagosService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.cargarEspecies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }

  /**
   * Función encargada de cargar las especies
   */
  cargarEspecies() {
    if (this.cargando == false) {
      this.cargando = true;

      this.finanzasProgramadorPagosService.listadoDeEspeciesEnSolicitudes()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            if (response.exito == true) {
              this.especies = response.datos;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false);
    }
  }

  /**
   * Selecciona el perfil
   * @param perfil 
   */
  seleccionarPerfil(perfil: PerfilBasicoInfoPersonal) {
    this.perfilBasicoInfoPersonalSeleccionado = perfil;
  }

  limpiar() {
    this.clearAll$.next();
    this.especieIdSeleccionado = null;
    this.fechaDeSolicitud = null;
    this.perfilBasicoInfoPersonalSeleccionado = null;
    this.estadoSeleccionado = null;
    this.metodoSeleccionado = null;
  }

  aplicar() {
    let filtro: FiltroListadoSolicitudes = {};

    if (this.metodoSeleccionado) {
      filtro.metodoSeleccionDisponible = this.metodoSeleccionado;
    }

    if (this.fechaDeSolicitud) {
      filtro.fechaDeSolicitud = this.datePipe.transform(new Date(this.fechaDeSolicitud), 'dd/MM/yyyy');
    }

    if (this.perfilBasicoInfoPersonalSeleccionado) {
      filtro.perfilId = this.perfilBasicoInfoPersonalSeleccionado.id;
    }

    if (this.especieIdSeleccionado) {
      filtro.especieId = this.especieIdSeleccionado;
    }

    if (this.estadoSeleccionado) {
      filtro.estado = this.estadoSeleccionado;
    }

    this.observerFiltro$.next(filtro);
    this.cerrar();
  }
}
