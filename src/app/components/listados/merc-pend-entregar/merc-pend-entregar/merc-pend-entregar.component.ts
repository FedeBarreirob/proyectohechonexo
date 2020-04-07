import { Component, OnInit, ViewChild, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MovimientoMercPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { MercPendEntregarService } from '../../../../services/merc-pend-entregar/merc-pend-entregar.service';
import { MercPendEntregarDetalleDesktopComponent } from '../merc-pend-entregar-detalle-desktop/merc-pend-entregar-detalle-desktop.component';
import { FiltroMercaderiaPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/filtro-merc-pend-entregar';
import { MercPendEntregarExportacionesService } from '../../../../services/merc-pend-entregar/merc-pend-entregar-exportaciones.service';

@Component({
  selector: 'app-merc-pend-entregar',
  templateUrl: './merc-pend-entregar.component.html',
  styleUrls: ['./merc-pend-entregar.component.css'],
  providers: [DatePipe]
})

export class MercPendEntregarComponent implements OnInit, AfterViewInit {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  @Input()
  cuenta: string;
  cargando$: Subject<boolean> = new Subject<boolean>();

  observerFiltro$ = new Subject<any>();
  esCelular: boolean;
  destroy$: Subject<any> = new Subject<any>();

  modoDetalleDesktop: boolean = false;
  modoDetalleDesktopMovimiento$: Subject<MovimientoMercPendEntregar> = new Subject<MovimientoMercPendEntregar>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  contratoId: number;
  desdeDef: Date = new Date(new Date().getFullYear(), 0, 1);
  hastaDef: Date = new Date();

  constructor(private deviceService: DeviceDetectorService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private exportadorService: MercPendEntregarExportacionesService,
    private mercPendEntregarService: MercPendEntregarService,
    public dialog: MatDialog,
    private datePipe: DatePipe
    ) {

  }

  ngAfterViewInit(): void {
    this.cargarListado({
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.desdeDef, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.hastaDef, 'dd/MM/yyyy')
    })
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.observerFiltro$.next({
      cuenta: this.cuenta,
      fechaDesde: null,
      fechaHasta: null
    });
    this.cargarBotonesExtrasDescarga();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que ejecuta la carga del listado de comprobantes pendientes de facturar
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoMercPendEntregar) {

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

    this.dialog.open(MercPendEntregarDetalleDesktopComponent, opciones);
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  /**
   * Muestra el indicador de carga mientras haya un proceso ejecutándose
   */
  mostrarIndicadorLoading(cargando: boolean) {
    this.cargando$.next(cargando);
  }

  /**
   * Función encargada de mostrar el detalle de un movimiento seleccionado en modo desktop
   * @param movimiento 
   */
  verDetalleDesktop(movimiento: MovimientoMercPendEntregar) {
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
        this.identificadoresParaDescarga.length > 1 ? this.exportacionMasivaExcel() : this.exportadorService.exportarMercPendEntregarDetalleExcel(this.identificadoresParaDescarga[0].movimiento);
        break;

      case "pdf":
        this.identificadoresParaDescarga.length > 1 ? this.exportacionMasivaPDF() : this.exportadorService.exportarMercPendEntregarDetallePDF(this.identificadoresParaDescarga[0].movimiento);
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

      this.exportadorService.exportarListadoMercPendEntregarDetalleExcel(movimientosSeleccionados);
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

      this.exportadorService.exportarListadoMercPendEntregarDetallePDF(movimientosSeleccionados, null);
      this.descargandoArchivos = false;
    }
  }
}
