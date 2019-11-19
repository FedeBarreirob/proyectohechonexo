import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { VentasDetalleComponent } from '../ventas-detalle/ventas-detalle.component';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';
import { takeUntil } from 'rxjs/operators';
import { FiltroPersonalizadoParaFiltroCereal } from '../../../../interfaces/varios/filtro-personalizado-para-filtro-cereal';
import { saveAs } from 'file-saver/FileSaver';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { VentasExportacionesService } from '../../../../services/ventas/ventas-exportaciones.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  public filtrosEspecieCosecha: FiltroEspecieCosecha;
  public cargandoFiltros: boolean;
  cargando$: Subject<boolean> = new Subject<boolean>();

  observerFiltro$ = new Subject<any>();
  esCelular: boolean;
  destroy$: Subject<any> = new Subject<any>();

  pactadasCantidad: number = 124;
  pactadasPorcentaje: number = 78;

  fijadasCantidad: number = 200;
  fijadasPorcentaje: number = 23;

  pesificadasCantidad: number = 86;
  pesificadasPorcentaje: number = 100;

  liquidadasCantidad: number = 862;
  liquidadasPorcentaje: number = 93;

  pagadasCantidad: number = 800;
  pagadasPorcentaje: number = 78;

  modoDetalleDesktop: boolean = false;
  modoDetalleDesktopMovimiento$: Subject<MovimientoVenta> = new Subject<MovimientoVenta>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  // filtro a utilizar en la barra de filtros de cereales
  filtroPersonalizado: Array<FiltroPersonalizadoParaFiltroCereal> = [
    {
      descripcion: "Pesificado",
      filtroAtributo: "pesificado",
      value: true
    },
    {
      descripcion: "Pendientes de pesificar",
      filtroAtributo: "pesificado",
      value: false
    }
  ];

  constructor(
    private ventasService: VentasService,
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private ventasExportacionesService: VentasExportacionesService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          if (!this.cuenta || (this.cuenta && this.cuenta.id.codigo != cuentaAlg.id.codigo)) {
            this.seleccionarCuenta(cuentaAlg);
            this.cargarListadoPorDefecto();
          }
        }
      );

    this.cargarBotonesExtrasDescarga();
  }

  ngAfterViewInit(): void {
    if (this.cuentaAlgService.cuentaPreviamenteSeleccionada && !this.esCelular) {
      this.seleccionarCuenta(this.cuentaAlgService.cuentaPreviamenteSeleccionada);
      this.cargarListadoPorDefecto();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
  cargarFiltrosEspecieCosecha() {
    if (!this.cargandoFiltros) {
      this.cargandoFiltros = true;

      let codigoEntidad = (this.cuenta) ? this.cuenta.id.codigo : null;

      this.ventasService.listadoFiltrosEspecieCosecha(codigoEntidad)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.filtrosEspecieCosecha = respuesta;
            this.cargandoFiltros = false;
          }, () => { console.log("error"); this.cargandoFiltros = true; }
        );
    }
  }

  // funcion que ejecuta la carga del listado de entregas
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: FijacionVenta) {

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

    this.dialog.open(VentasDetalleComponent, opciones);
  }

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
    this.cuenta = cuentaSeleccionada;
    this.cargarFiltrosEspecieCosecha();
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

	/**
	 * Arma un filtro por defecto y ejecuta el listado
	 */
  cargarListadoPorDefecto() {
    let filtro = {
      cuenta: this.cuenta.id.codigo,
      fechaDesde: null,
      fechaHasta: null,
      especie: null,
      cosecha: null
    }

    this.cargarListado(filtro);
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
  verDetalleDesktop(movimiento: MovimientoVenta) {
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
  ventasSeleccionados(listadoSeleccionados: any) {
    this.identificadoresParaDescarga = listadoSeleccionados;
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
   * Función que ejecuta el proceso de descarga de comprobantes seleccionados
   */
  descargarSeleccionados() {
    if (this.identificadoresParaDescarga && this.identificadoresParaDescarga.length > 0 && this.descargandoArchivos == false) {

      this.descargandoArchivos = true;
      let identificadores = this.identificadoresParaDescarga.map(identificador => {
        return {
          sucursal: 1,
          comprobante: identificador.movimiento.numeroComprobanteContrato
        }
      });

      this.comprobanteDownloaderService.confirmacionVentaDescargadoMasivo(identificadores)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/zip';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `boletos.zip`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("Los comprobantes no se encuentra disponible para su descarga.", "Descarga de comprobantes");
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

      this.ventasExportacionesService.exportarListadoVentasDetalleExcel(movimientosSeleccionados);
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

      this.ventasExportacionesService.exportarListadoVentasDetallePDF(movimientosSeleccionados, null);
      this.descargandoArchivos = false;
    }
  }
}
