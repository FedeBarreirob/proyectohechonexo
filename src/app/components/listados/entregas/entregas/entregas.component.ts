import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { EntregasDetalleComponent } from '../entregas-detalle/entregas-detalle.component';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';
import { TutorialModalComponent } from '../../../common/tutorial-modal/tutorial-modal.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { TutorialModalService } from '../../../../services/tutorial-modal/tutorial-modal.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
  providers: [DatePipe]
})
export class EntregasComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  aplicado: boolean = false;

  @Input()
  contratoId$: Subject<any>;

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  public filtrosEspecieCosecha: FiltroEspecieCosecha;
  public cargandoFiltros: boolean;
  cargando$: Subject<boolean> = new Subject<boolean>();

  observerFiltro$ = new Subject<any>();
  esCelular: boolean;
  destroy$: Subject<any> = new Subject<any>();

  modoDetalleDesktop: boolean = false;
  modoDetalleDesktopMovimiento$: Subject<MovimientoEntrega> = new Subject<MovimientoEntrega>();

  identificadoresParaDescarga: Array<any>;
  descargandoArchivos: boolean = false;
  botonesBarraDescargaExtras: Array<any> = [];

  contratoId: number;

  constructor(
    private entregasService: EntregasService,
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private snackBar: MatSnackBar,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private entregasExportacionesService: EntregasExportacionesService,
    private authenticationService: AuthenticationService,
    private tutorialModalService: TutorialModalService
  ) {
  }

  ngOnInit() {
    if (this.authenticationService.esRol("PRODUCTOR") && this.aplicado == false) {
      var currentUser = JSON.parse(localStorage.getItem('currentUserPerfil'));
      var entregasTutorial = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'entregasTutorial')[0];

      // Modal tutorial
      if (!JSON.parse(localStorage.getItem('entregasTutorial')) && !entregasTutorial.visto) {
        const dialogRef = this.dialog.open(TutorialModalComponent, {
          data: { title: entregasTutorial.contenido.title, description: entregasTutorial.contenido.description }
        });

        dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem('entregasTutorial', JSON.stringify(true));
          this.tutorialModalService.marcarVisto({
            perfilId: currentUser.informacionPersonal.id,
            key: 'entregasTutorial',
            visto: true
          }).subscribe(result => {

          });
        });
      }
    }

    this.esCelular = this.deviceService.isMobile();

    if (this.contratoId$) {
      this.contratoId$.subscribe(contratoId => {
        this.contratoId = contratoId;
        this.cargarListadoPorDefecto();
      });
    }

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          if (!this.cuenta || (this.cuenta && this.cuenta.id.codigo != cuentaAlg.id.codigo)) {
            this.seleccionarCuenta(cuentaAlg);

            if (this.aplicado == false) {
              this.cargarListadoPorDefecto();
            }
          }
        }
      );

    this.cargarBotonesExtrasDescarga();
  }

  ngAfterViewInit(): void {
    if (this.cuentaAlgService.cuentaPreviamenteSeleccionada && !this.esCelular) {
      this.seleccionarCuenta(this.cuentaAlgService.cuentaPreviamenteSeleccionada);

      if (this.aplicado == false) {
        this.cargarListadoPorDefecto();
      }
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

      this.entregasService.listadoFiltrosEspecieCosecha(codigoEntidad)
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

    if (this.contratoId) {
      filtro.contratoId = this.contratoId;
      filtro.aplicado = true;
    }

    this.observerFiltro$.next(filtro);
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {

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

    this.dialog.open(EntregasDetalleComponent, opciones);
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
      cosecha: null,
      contratoId: this.contratoId,
      aplicado: (this.contratoId) ? true : null
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
  verDetalleDesktop(movimiento: MovimientoEntrega) {
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
  entregasSeleccionados(listadoSeleccionados: any) {
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
        this.identificadoresParaDescarga.length > 1 ? this.exportacionMasivaExcel() : this.entregasExportacionesService.exportarEntregasDetalleExcel(this.identificadoresParaDescarga[0].movimiento);
        break;

      case "pdf":
        this.identificadoresParaDescarga.length > 1 ? this.exportacionMasivaPDF() : this.entregasExportacionesService.exportarEntregasDetallePDF(this.identificadoresParaDescarga[0].movimiento);
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
