import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { InfoCtaCte } from '../../../../enums/info-cta-cte.enum';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { Subject } from 'rxjs';
import { CtacteService } from '../../../../services/ctacte/ctacte.service';
import { takeUntil } from 'rxjs/operators';
import { FiltroPersonalizadoParaFiltroCtaCte } from '../../../../interfaces/varios/filtro-personalizado-para-filtro-cta-cte';
import { CuentaCorrienteItemDesktopComponent } from '../cuenta-corriente-item-desktop/cuenta-corriente-item-desktop.component';
import { MatSnackBar } from '@angular/material';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { environment } from '../../../../../environments/environment';
import { saveAs } from 'file-saver/FileSaver';
import { DownloaderUtilService } from '../../../../services/sharedServices/downloader/downloader-util.service';
import { ComprobanteParaDescarga } from '../../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { CtaCteExportacionesService } from '../../../../services/ctacte/cta-cte-exportaciones.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuenta-corriente-lista-desktop',
  templateUrl: './cuenta-corriente-lista-desktop.component.html',
  styleUrls: ['./cuenta-corriente-lista-desktop.component.css'],
  providers: [DatePipe]
})
export class CuentaCorrienteListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(CuentaCorrienteItemDesktopComponent)
  ctacteItems: QueryList<CuentaCorrienteItemDesktopComponent>;

  infoCtaCte: any = InfoCtaCte;
  listado: Array<MovimientoCtaCte> = [];
  filtro: any;
  cargando: boolean = false;
  cargandoPDF$: Subject<boolean> = new Subject<boolean>();
  destroy$: Subject<any> = new Subject<any>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  // filtros de fecha por defecto
  hoy: Date;
  semanaAtras: Date;

  // filtro a utilizar en la barra de filtros de cereales
  filtroPersonalizado: Array<FiltroPersonalizadoParaFiltroCtaCte> = [
    {
      descripcion: "A cobrar",
      filtroAtributo: "aCobrar",
      checkbox: true,
      value: null
    },
    {
      descripcion: "A pagar",
      filtroAtributo: "aPagar",
      checkbox: true,
      value: null
    },
    {
      descripcion: "Vencido",
      filtroAtributo: "vencido",
      checkbox: true,
      value: null
    },
    {
      descripcion: "A Vencer",
      filtroAtributo: "AVencer",
      checkbox: true,
      value: null
    }
  ];

  constructor(
    private ctacteService: CtacteService,
    private snackBar: MatSnackBar,
    private comprobantesDownloaderService: ComprobantesDownloaderService,
    private downloaderUtilService: DownloaderUtilService,
    private exportacionesService: CtaCteExportacionesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.cargarRangoFechasDef();
    this.cargarBotonesExtrasDescarga();
    this.cargarListado();
  }

  /**
   * Inicializa el rango de fecha por defecto
   */
  cargarRangoFechasDef() {
    this.hoy = new Date();
    this.semanaAtras = new Date();
    this.semanaAtras.setDate(this.semanaAtras.getDate() - 7);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de ejecutar 
   * @param filtro 
   */
  aplicar(filtro: any) {
    this.filtro = filtro;
    this.cargarListado();
  }

  /**
   * Función encargada de cargar el listado de entregas
   */
  cargarListado() {
    if (!this.cargando) {
      this.cargando = true;

      this.limpiar();

      let filtroPaginado: any = (this.filtro) ? this.filtro : this.filtroPorDefecto();
      filtroPaginado.totales = true;
      filtroPaginado.paginado = false;
      filtroPaginado.ordenado = false;

      this.ctacteService.listadoCtaCte(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          this.listado = respuesta.datos.listado;
          this.cargando = false;
        }, () => {
          this.cargando = false;
        });
    }
  }

  /**
   * Retorna filtro por defecto
   */
  filtroPorDefecto(): any {

    let fechaDesdeFiltro = this.datePipe.transform(this.semanaAtras, 'dd/MM/yyyy');
    let fechaHastaFiltro = this.datePipe.transform(this.hoy, 'dd/MM/yyyy');

    return {
      cuenta: this.cuenta.id.codigo,
      fechaDesde: fechaDesdeFiltro,
      fechaHasta: fechaHastaFiltro
    };
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.listado.splice(0, this.listado.length);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoCtaCte) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Función encargada de crear una lista con los seleccionados
   */
  rearmarListaSeleccionados() {
    if (this.ctacteItems && this.ctacteItems.length > 0) {

      let listadoSeleccionados = this.ctacteItems
        .filter(ctacteItem => ctacteItem.seleccionado == true && ctacteItem.movimiento.concepto != "TRANSPORTE")
        .map(ctacteItem => {
          return {
            movimiento: ctacteItem.movimiento
          };
        });

      this.identificadoresParaDescarga = listadoSeleccionados;
    }
  }

  /**
   * Selecciona todos los items si corresponde, rearma el listado de descarga
   * @param todos 
   */
  seleccionarTodos(seleccion: boolean) {
    if (this.ctacteItems && this.ctacteItems.length > 0) {

      this.ctacteItems.forEach(ctacteItem => ctacteItem.seleccionado = seleccion);
      this.rearmarListaSeleccionados();

    }
  }

  /**
   * Función encargada de cargar los botones extras en la barra de descargas
   */
  cargarBotonesExtrasDescarga() {

    this.botonesBarraDescargaExtras.push({
      id: "excel",
      nombre: "Exportar a Excel",
      img: "assets/varios/excel.svg"
    });

    this.botonesBarraDescargaExtras.push({
      id: "pdf",
      nombre: "Exportar a PDF",
      img: "assets/varios/pdf-verde.svg"
    });

  }

  /**
   * Ejecuta la exportación indicada
   * @param exportador 
   */
  exportarSegunOpcion(exportador: any) {
    switch (exportador) {
      case "excel":
        this.exportacionMasivaExcel();
        break;

      case "pdf":
        this.exportacionMasivaPDF();
        break;

      default:
        break;
    }
  }

  /**
   * Exporta el listado a excel
   */
  exportacionMasivaExcel() {
    if (this.identificadoresParaDescarga && this.descargandoArchivos == false) {
      this.descargandoArchivos = true;

      let movimientos: Array<MovimientoCtaCte> = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);
      this.exportacionesService.exportarListadoMovCtaCteDetalleExcel(movimientos);

      this.descargandoArchivos = false;
    }
  }

  /**
   * Exporta el listado a pdf
   */
  exportacionMasivaPDF() {
    if (this.identificadoresParaDescarga && this.descargandoArchivos == false) {
      this.descargandoArchivos = true;

      if (this.listado.filter(item => item.concepto != "TRANSPORTE").length == this.identificadoresParaDescarga.length) {
        let filtroPaginado: any = (this.filtro) ? this.filtro : this.filtroPorDefecto();
        filtroPaginado.totales = true;
        filtroPaginado.paginado = false;
        filtroPaginado.ordenado = false;
        this.cargandoPDF$.next(true);
        this.ctacteService.listadoCtaCte(filtroPaginado)
          .pipe(takeUntil(this.destroy$))
          .subscribe(respuesta => {
            this.exportacionesService.exportarListadoMovCtaCteDetallePDF(respuesta.datos.listado.filter(item => item.concepto != "TRANSPORTE"), null);
            this.cargando = false;
            this.cargandoPDF$.next(false);
          }, () => {
            this.cargando = false;
            this.cargandoPDF$.next(false);
          });
      }
      else {
        let movimientos: Array<MovimientoCtaCte> = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);
        this.exportacionesService.exportarListadoMovCtaCteDetallePDF(movimientos, null);
      }

      this.descargandoArchivos = false;
    }
  }

  /**
   * Función encargada de ejecutar el proceso de descarga de comprbantes
   */
  descargarSeleccionados() {
    if (this.identificadoresParaDescarga && this.descargandoArchivos == false) {

      this.descargandoArchivos = true;

      let comprobantesSeleccionados: Array<ComprobanteParaDescarga> = this.identificadoresParaDescarga
        .map(identificador => {
          return {
            comprobante: identificador.movimiento.comprobante,
            link: identificador.movimiento.linkComprobante,
            existeArchivo: true
          }
        });

      this.comprobantesDownloaderService.comprobanteDescargadoMasivo(comprobantesSeleccionados)
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

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
