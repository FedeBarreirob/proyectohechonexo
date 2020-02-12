import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { InfoCtaCte } from '../../../../enums/info-cta-cte.enum';
import { Subject } from 'rxjs';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { takeUntil } from 'rxjs/operators';
import { FiltroPersonalizadoParaFiltroCtaCte } from '../../../../interfaces/varios/filtro-personalizado-para-filtro-cta-cte';
import { MatSnackBar } from '@angular/material';
import { CuentaCorrienteAplicadaItemDesktopComponent } from '../cuenta-corriente-aplicada-item-desktop/cuenta-corriente-aplicada-item-desktop.component';
import { environment } from '../../../../../environments/environment';
import { saveAs } from 'file-saver/FileSaver';
import { DownloaderUtilService } from '../../../../services/sharedServices/downloader/downloader-util.service';
import { ComprobanteParaDescarga } from '../../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { CtaCteAplicadaExportacionesServiceService } from '../../../../services/ctacte-aplicada/cta-cte-aplicada-exportaciones-service.service';

@Component({
  selector: 'app-cuenta-corriente-aplicada-lista-desktop',
  templateUrl: './cuenta-corriente-aplicada-lista-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-lista-desktop.component.css']
})
export class CuentaCorrienteAplicadaListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren(CuentaCorrienteAplicadaItemDesktopComponent)
  ctacteItems: QueryList<CuentaCorrienteAplicadaItemDesktopComponent>;

  infoCtaCte: any = InfoCtaCte;
  listado: Array<MovimientoCtaCteAplicada> = [];
  filtro: any;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

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
    private ctacteAplicadaService: CtacteAplicadaService,
    private snackBar: MatSnackBar,
    private downloaderUtilService: DownloaderUtilService,
    private comprobantesDownloaderService: ComprobantesDownloaderService,
    private exportacionesService: CtaCteAplicadaExportacionesServiceService
  ) { }

  ngOnInit() {
    this.cargarBotonesExtrasDescarga();
    this.cargarListado();
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

      this.ctacteAplicadaService.listadoCtaCte(filtroPaginado)
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
    return {
      cuenta: this.cuenta.id.codigo
    };
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.listado.splice(0, this.listado.length);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoCtaCteAplicada) {
    this.seleccionMovimiento.emit(movimiento);
  }

  /**
   * Función encargada de crear una lista con los seleccionados
   */
  rearmarListaSeleccionados() {
    if (this.ctacteItems && this.ctacteItems.length > 0) {

      let listadoSeleccionados = this.ctacteItems
        .filter(ctacteItem => ctacteItem.seleccionado == true)
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

      let movimientos: Array<MovimientoCtaCteAplicada> = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);
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

      let movimientos: Array<MovimientoCtaCteAplicada> = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);
      this.exportacionesService.exportarListadoMovCtaCteDetallePDF(movimientos, null);

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
            comprobante: identificador.movimiento.comprobanteAfectado,
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

  get totalPesos(): number {
    var totalPesos = 0;
    this.identificadoresParaDescarga.forEach(x => totalPesos += x.saldoPesos);
    return totalPesos;
  }

  get totalDolares(): number {
    var totalDolares = 0;
    this.identificadoresParaDescarga.forEach(x => totalDolares += x.saldoDolares);
    return totalDolares;
  }
}
