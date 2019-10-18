import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FiltroCtaCteComprobanteDescarga } from '../../../../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ArchivoDeComprobantesService } from '../../../../../services/archivo-de-comprobantes/archivo-de-comprobantes.service';
import { ComprobanteParaDescarga } from '../../../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { ComprobantesDownloaderService } from '../../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-archivo-de-comprobantes',
  templateUrl: './archivo-de-comprobantes.component.html',
  styleUrls: ['./archivo-de-comprobantes.component.css'],
  providers: [DatePipe]
})
export class ArchivoDeComprobantesComponent implements OnInit, OnDestroy {

  @Input()
  filtroArchivosComprobantes$: Subject<FiltroCtaCteComprobanteDescarga> = new Subject<FiltroCtaCteComprobanteDescarga>();

  @Input()
  cuenta: string

  pagina: number = 1;
  cantidadPorPagina: number = 50;
  filtro: FiltroCtaCteComprobanteDescarga;

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  toggleSeleccionTodo: boolean = false;
  esCelular: boolean;

  // listado de las referencias a los comprobantes
  comprobantes: Array<ComprobanteParaDescarga> = [];
  comprobantesSeleccionados: Array<ComprobanteParaDescarga> = [];

  constructor(
    private archivoDeComprobantesService: ArchivoDeComprobantesService,
    private comprobantesDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.filtroArchivosComprobantes$.subscribe(
      filtro => {
        this.filtro = filtro;
        this.cargarListado(true);
      }
    );

    this.cargarFiltroPorDefecto();
    this.cargarListado(true);
  }

  /**
   * Función encargada de cargar el filtro por defecto
   */
  cargarFiltroPorDefecto() {
    let hace3Meses: Date = new Date();
    hace3Meses.setMonth(hace3Meses.getMonth() - 3);

    let fechaDesdeFiltro = this.datePipe.transform(hace3Meses, 'dd/MM/yyyy');
    let fechaHastaFiltro = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

    this.filtro = {
      esAplicada: false,
      cuenta: this.cuenta,
      paginado: true,
      fechaDesde: fechaDesdeFiltro,
      fechaHasta: fechaHastaFiltro
    }
  }

  // funcion encargada de cargar el listado de comprobantes
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.paginado = true;
      this.filtro.pagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.archivoDeComprobantesService.comprobantesFiltrados(this.filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          // si no hay datos, reestablecer la pagina
          if (respuesta.datos == null || respuesta.datos.length == 0) {
            this.pagina = this.pagina - 1;
          }

          if (respuesta.exito == true && respuesta.datos != null) {
            this.agregarAlListado(respuesta.datos);
          }

          this.cargando = false;
        }, () => {
          this.cargando = false;
        });
    }
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarAlListado(comprobantesPagina: Array<ComprobanteParaDescarga>) {
    comprobantesPagina.forEach(
      comprobante => {
        this.comprobantes.push(comprobante);
      }
    );
  }

  // funcion que actualiza el listado de comprobantes seleccionados
  actualizarSeleccion($event) {
    this.comprobantesSeleccionados = $event;

    // actualizar estado del seleccionador de todos
    this.toggleSeleccionTodo = this.sonTodosSeleccionados();
  }

  // funcion que determina si todos los item se encuentran seleccionados
  private sonTodosSeleccionados(): boolean {
    try {
      if (this.comprobantes.length == this.comprobantesSeleccionados.length) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // funcion encargada de seleccionar todos o ningun comprobante
  seleccionarTodoONada($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.comprobantesSeleccionados = this.comprobantes;
    } else {
      this.comprobantesSeleccionados = [];
    }
  }

  // funcion encargada de ejecutar el proceso de descarga
  descargar() {
    if (this.cargando == false) {
      this.cargando = true;

      this.comprobantesDownloaderService.comprobanteDescargadoMasivo(this.comprobantesSeleccionados)
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = 'comprobantes.zip';

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("Ninguno de los comprobantes indicados se encuentran para su descarga.");
          }

          this.cargando = false;
        }, error => {
          console.log(error);
          this.cargando = false;
        });
    }
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  // funcion encargada de limpiar para nueva generacion
  limpiar() {
    this.comprobantes = [];
    this.pagina = 1;
    this.comprobantes.splice(0, this.comprobantes.length);
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }
}
