import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FiltroCtaCteComprobanteDescarga } from '../../../../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ArchivoDeComprobantesService } from '../../../../../services/archivo-de-comprobantes/archivo-de-comprobantes.service';
import { ComprobanteParaDescarga } from '../../../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { ComprobantesDownloaderService } from '../../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DownloaderUtilService } from '../../../../../services/sharedServices/downloader/downloader-util.service';
import { environment } from '../../../../../../environments/environment';
import { FiltroComprobanteDescarga } from '../../../../../interfaces/archivo-de-comprobantes/filtro-comprobante-descarga';
import { OrigenComprobante } from '../../../../../enums/origen-comprobante.enum';
import { ResponseServicio } from '../../../../../interfaces/varios/response-servicio';

@Component({
  selector: 'app-archivo-de-comprobantes',
  templateUrl: './archivo-de-comprobantes.component.html',
  styleUrls: ['./archivo-de-comprobantes.component.css'],
  providers: [DatePipe]
})
export class ArchivoDeComprobantesComponent implements OnInit, OnDestroy {

  @Input()
  filtroArchivosComprobantes$: Subject<FiltroComprobanteDescarga> = new Subject<FiltroComprobanteDescarga>();

  @Input()
  cuenta: string

  pagina: number = 1;
  cantidadPorPagina: number = 50;
  filtro: FiltroComprobanteDescarga;

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  descargandoArchivos: boolean = false;
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
    private deviceService: DeviceDetectorService,
    private downloaderUtilService: DownloaderUtilService
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
      origen: OrigenComprobante.CONTRATOS,
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

      let comprobantesObs: Observable<ResponseServicio> = this.comprobantesSegunOrigen();
      if (comprobantesObs) {

        comprobantesObs
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

      } else {
        this.cargando = false;
      }
    }
  }

  /**
   * Devuelve los comprobantes segun origen indicado en el filtro
   */
  comprobantesSegunOrigen(): Observable<ResponseServicio> {

    let observer: Observable<ResponseServicio>;

    // filtro para cuenta corriente unicamente
    let filtroSrv: FiltroCtaCteComprobanteDescarga = this.filtro;

    switch (this.filtro.origen) {

      case OrigenComprobante.CUENTA_CORRIENTE:
        filtroSrv.esAplicada = false;
        observer = this.archivoDeComprobantesService.comprobantesCtaCteFiltrados(filtroSrv);
        break;

      case OrigenComprobante.CUENTA_CORRIENTE_APLICADA:
        filtroSrv.esAplicada = true;
        observer = this.archivoDeComprobantesService.comprobantesCtaCteFiltrados(filtroSrv);
        break;

      case OrigenComprobante.CONTRATOS:
        observer = this.archivoDeComprobantesService.comprobantesContratosFiltrados(this.filtro);
        break;

      case OrigenComprobante.ENTREGAS:
        observer = this.archivoDeComprobantesService.comprobantesEntregasFiltrados(this.filtro);
        break;

      case OrigenComprobante.VENTAS:
        observer = this.archivoDeComprobantesService.comprobantesVentasFiltrados(this.filtro);
        break;

      default:
        observer = null;
    }

    return observer;
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

  /**
   * Ejecuta el proceso de descarga segun tipo de comprobantes
   */
  descargar() {
    switch (this.filtro.origen) {

      case OrigenComprobante.CUENTA_CORRIENTE:
        this.descargarCtaCte();
        break;

      case OrigenComprobante.CUENTA_CORRIENTE_APLICADA:
        this.descargarCtaCte();
        break;

      case OrigenComprobante.CONTRATOS:
        this.descargarContratos();
        break;

      case OrigenComprobante.ENTREGAS:
        this.descargarEntregas();
        break;

      case OrigenComprobante.VENTAS:
        this.descargarContratos();
        break;

      default:
        break;
    }
  }

  /**
   * Ejecuta el proceso de descarga de los comprobantes de ctacte y aplicada
   */
  descargarCtaCte() {
    if (this.descargandoArchivos == false) {
      this.descargandoArchivos = true;

      this.comprobantesDownloaderService.comprobanteDescargadoMasivo(this.comprobantesSeleccionados)
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = 'comprobantes.zip';

          if (blob.size !== 0) {

            if (environment.inPhonegap) {
              this.downloaderUtilService.download(filename, blob, mediaType);
            } else {
              saveAs(blob, filename);
            }

          } else {
            this.openSnackBar("Ninguno de los comprobantes indicados se encuentran para su descarga.");
          }

          this.descargandoArchivos = false;
        }, error => {
          console.log(error);
          this.descargandoArchivos = false;
        });
    }
  }

  /**
   * Función que ejecuta el proceso de descarga de comprobantes seleccionados
   */
  descargarContratos() {
    if (this.descargandoArchivos == false && this.comprobantesSeleccionados && this.comprobantesSeleccionados.length > 0) {
      this.descargandoArchivos = true;

      let identificadores: Array<any> = this.comprobantesSeleccionados.map(comprobantes => {

        let comprobantePartes = comprobantes.link.split("-");

        return {
          sucursal: comprobantePartes[0],
          comprobante: comprobantePartes[1]
        }
      });

      this.comprobantesDownloaderService.confirmacionVentaDescargadoMasivo(identificadores)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `boletos.zip`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("Ninguno de los comprobantes indicados se encuentran para su descarga.");
          }

          this.descargandoArchivos = false;
        }, error => {
          console.log(error);
          this.descargandoArchivos = false;
        });
    }
  }

  /**
   * Función que ejecuta el proceso de descarga de comprobantes seleccionados
   */
  descargarEntregas() {
    if (this.descargandoArchivos == false && this.comprobantesSeleccionados && this.comprobantesSeleccionados.length > 0) {
      this.descargandoArchivos = true;

      let identificadores = this.comprobantesSeleccionados.map(comrpobante => comrpobante.link);

      this.comprobantesDownloaderService.certificadoAfipDescargadoMasivo(identificadores)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `certificados.zip`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("Ninguno de los comprobantes indicados se encuentran para su descarga.");
          }

          this.descargandoArchivos = false;
        }, error => {
          console.log(error);
          this.descargandoArchivos = false;
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
