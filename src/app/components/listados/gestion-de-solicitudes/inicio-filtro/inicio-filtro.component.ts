import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FinanzasProgramadorPagosService } from '../../../../services/finanzas/finanzas-programador-pagos.service';
import { takeUntil } from 'rxjs/operators';
import { Especie } from '../../../../interfaces/varios/especie';

@Component({
  selector: 'app-inicio-filtro',
  templateUrl: './inicio-filtro.component.html',
  styleUrls: ['./inicio-filtro.component.css']
})
export class InicioFiltroComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();
  
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  especies: Array<Especie>;
  especieIdSeleccionado: number;
  fechaFijacion: string;
  
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

  constructor(private finanzasProgramadorPagosService: FinanzasProgramadorPagosService) { }

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
}
