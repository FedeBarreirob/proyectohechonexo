import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntidadAlg } from '../../../../../../interfaces/perfiles/entidad-alg';
import { EntregasService } from '../../../../../../services/entregas/entregas.service';
import { Cosecha } from '../../../../../../interfaces/varios/cosecha';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-definicion-filtro',
  templateUrl: './definicion-filtro.component.html',
  styleUrls: ['./definicion-filtro.component.css'],
  providers: [DatePipe]
})
export class DefinicionFiltroComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Input()
  especie: string;

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  cosechas: Array<Cosecha>;
  cosecha: string;
  fechaFijacion: string;

  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  destinos = [
    {
      descripcion: "Planta",
      value: 1
    },
    {
      descripcion: "Puerto",
      value: 2
    }
  ];
  tipoDestinoSeleccionado: number;

  constructor(
    private entregasService: EntregasService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.cargarCosechas();
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
   * Función encargada de cargar las cosechas para usar en el filtro
   */
  cargarCosechas() {
    if (this.cargando == false) {
      this.cargando = true;

      this.entregasService.listadocontratosConDispPendFijarPesificarFiltroCosecha(this.cuenta.id.codigo, this.especie)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            if (response.exito == true) {
              this.cosechas = response.datos;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false);
    }
  }

  limpiar() {
    this.cosecha = null;
    this.fechaFijacion = null;
    this.tipoDestinoSeleccionado = null;
  }

  aplicar() {
    let filtro: any = {
      cuenta: this.cuenta.id.codigo,
      especie: this.especie,
    };

    if (this.fechaFijacion) {
      filtro.fechaFijacion = this.datePipe.transform(new Date(this.fechaFijacion), 'dd/MM/yyyy');
    }

    if (this.tipoDestinoSeleccionado) {
      filtro.tipoDestino = this.tipoDestinoSeleccionado;
    }

    if (this.cosecha) {
      filtro.cosechas = this.cosecha;
    }

    this.observerFiltro$.next(filtro);
    this.cerrar();
  }
}
