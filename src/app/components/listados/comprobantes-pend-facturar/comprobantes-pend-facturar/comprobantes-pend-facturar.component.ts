import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MovimientoComprobantesPendFact } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { ComprobantesPendFacturarService } from '../../../../services/comprobantes-pend-facturar/comprobantes-pend-facturar.service';
import { ComprobantesPendFacturarDetalleDesktopComponent } from '../comprobantes-pend-facturar-detalle-desktop/comprobantes-pend-facturar-detalle-desktop.component';
import { FiltroComprobantesPendFacturar } from '../../../../interfaces/comprobantes-pend-facturar/filtro-comp-pend-fact';

import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';

@Component({
  selector: 'app-comprobantes-pend-facturar',
  templateUrl: './comprobantes-pend-facturar.component.html',
  styleUrls: ['./comprobantes-pend-facturar.component.css'],
  providers: [DatePipe]
})

export class ComprobantesPendFacturarComponent implements OnInit, OnDestroy {

  @Input()
  aplicado: boolean = false;

  @Input()
  contratoId$: Subject<any>;

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  @Input()
  cuenta: string;
  public filtrosComprobantesPendFacturar: FiltroComprobantesPendFacturar;
  public cargandoFiltros: boolean;
  cargando$: Subject<boolean> = new Subject<boolean>();

  observerFiltro$ = new Subject<any>();
  esCelular: boolean;
  destroy$: Subject<any> = new Subject<any>();

  modoDetalleDesktop: boolean = false;
  modoDetalleDesktopMovimiento$: Subject<MovimientoComprobantesPendFact> = new Subject<MovimientoComprobantesPendFact>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  contratoId: number;

  constructor(private deviceService: DeviceDetectorService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private entregasExportacionesService: EntregasExportacionesService,
    private compPendFactService: ComprobantesPendFacturarService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.contratoId$) {
      this.contratoId$.subscribe(contratoId => {
        this.contratoId = contratoId;
      });
    }

    this.cargarBotonesExtrasDescarga();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que ejecuta la carga del listado de comprobantes pendientes de facturar
  cargarListado(filtro: any) {

    if (this.contratoId) {
      filtro.contratoId = this.contratoId;
      filtro.aplicado = true;
    }

    this.observerFiltro$.next(filtro);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoComprobantesPendFact) {

    let opciones;
    if (this.esCelular) {
      opciones = {
        data: {
          movimiento: movimiento,
          linkContrato: true
        },
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      };
    } else {
      opciones = {
        data: {
          movimiento: movimiento,
          linkContrato: true
        },
        height: '90%',
        width: '500px'
      };
    }

    this.dialog.open(ComprobantesPendFacturarDetalleDesktopComponent, opciones);
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  /**
   * Muestra el indicador de carga mientras haya un proceso ejecutándose
   */
  mostrarIndicadorLoading(cargando: boolean) {
    if (cargando == true) {
      this.cargando$.next(true);
    } else {
      this.cargando$.next(false);
    }
  }

  /**
   * Función encargada de mostrar el detalle de un movimiento seleccionado en modo desktop
   * @param movimiento 
   */
  verDetalleDesktop(movimiento: MovimientoComprobantesPendFact) {
    this.modoDetalleDesktop = true;
    this.modoDetalleDesktopMovimiento$.next(movimiento);
  }

  /**
   * Función encargada de restaurar la vista saliendo del modo detalle
   */
  salirModoDetalleDesktop() {
    this.modoDetalleDesktop = false;
  }

  /**
   * Obtiene los comprobantes seleccionados para su descarga
   * @param listadoSeleccionados 
   */
  compPendFactSeleccionados(listadoSeleccionados: any) {
    this.identificadoresParaDescarga = listadoSeleccionados;
  }

  /**
   * Función que ejecuta el proceso de descarga de comprobantes seleccionados
   */
  descargarSeleccionados() {
    if (this.identificadoresParaDescarga && this.identificadoresParaDescarga.length > 0 && this.descargandoArchivos == false) {

      this.descargandoArchivos = true;
      let identificadores = this.identificadoresParaDescarga.map(identificador => identificador.movimiento.n1116A);

      this.comprobanteDownloaderService.certificadoAfipDescargadoMasivo(identificadores)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `certificados.zip`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("Los certificados no se encuentra disponible para su descarga.", "Descarga de comprobantes");
          }

          this.descargandoArchivos = false;
        }, error => {
          console.log(error);
          this.descargandoArchivos = false;
        });
    }
  }

  /**
  * Muestra un mensaje en pantalla
  * @param message Mensaje a mostrar
  * @param action Otro mensaje
  */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de cargar los botones extras en la barra de descargas
   */
  cargarBotonesExtrasDescarga() {
    if (!this.esCelular) {

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
   * Exporta todos los movimientos seleccionados a una planilla excel
   */
  exportacionMasivaExcel() {
    if (this.identificadoresParaDescarga && this.identificadoresParaDescarga.length > 0 && this.descargandoArchivos == false) {

      this.descargandoArchivos = true;
      let movimientosSeleccionados = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);

      this.entregasExportacionesService.exportarListadoEntregasDetalleExcel(movimientosSeleccionados);
      this.descargandoArchivos = false;
    }
  }

  /**
   * Exporta todos los movimientos seleccionados a un archivo pdf
   */
  exportacionMasivaPDF() {
    if (this.identificadoresParaDescarga && this.identificadoresParaDescarga.length > 0 && this.descargandoArchivos == false) {

      this.descargandoArchivos = true;
      let movimientosSeleccionados = this.identificadoresParaDescarga.map(identificador => identificador.movimiento);

      this.entregasExportacionesService.exportarListadoEntregasDetallePDF(movimientosSeleccionados, null);
      this.descargandoArchivos = false;
    }
  }
}
