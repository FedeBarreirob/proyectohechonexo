import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoMercPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { takeUntil } from 'rxjs/operators';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-merc-pend-entregar-detalle-desktop',
  templateUrl: './merc-pend-entregar-detalle-desktop.component.html',
  styleUrls: ['./merc-pend-entregar-detalle-desktop.component.css']
})

export class MercPendEntregarDetalleDesktopComponent implements OnInit {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<MovimientoComprobantesPendFact>;

  @Input()
  aplicado: boolean = false;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  destroy$: Subject<any> = new Subject<any>();
  movimiento: MovimientoComprobantesPendFact;
  cuenta: EntidadAlg;
  //contrato: ResumenContratoCompraVenta;
  cargando: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService,
    //private contratoServicio: ContratosService,
    public dialog: MatDialog,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private exportadorService: EntregasExportacionesService
  ) { }

  ngOnInit() {
    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.cuenta = cuentaAlg
    );

    this.modoDetalleDesktopMovimiento$.subscribe(
      movimiento => this.cargar(movimiento)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cargar todos los datos
   * @param movimiento 
   */
  cargar(movimiento: MovimientoComprobantesPendFact) {
    this.movimiento = movimiento;
    //this.cargarContrato();
  }

  /**
   * Cierra el detalle
   */
  cerrar() {
    this.salir.next();
  }

  /**
	 * Función encargada de cargar el contrato vinculado al ticket
	 */
  //cargarContrato() {
  //  this.cargando = true;
  //  this.contratoServicio.contratoResumenPorTk(this.movimiento.comprobante)
  //    .pipe(takeUntil(this.destroy$))
  //    .subscribe(
  //    respuesta => {
  //      if (respuesta.exito == true) {
  //        this.contrato = respuesta.datos;
  //      }

  //      this.cargando = false;
  //    },
  //    error => {
  //      console.log(error);
  //      this.cargando = false;
  //    }
  //    );
  //}

  /**
	 * Función que muestra la info del contrato asociado
	 */
  //verDetalleContrato() {
  //  let opciones = {
  //    data: this.contrato,
  //    height: '90%',
  //    width: '500px'
  //  };

  //  this.dialog.open(ContratosDetalleComponent, opciones);
  //}

  /**
	 * Descarga el certificado desde afip
	 */
  descargarCertificado() {
    if (this.cargando == false) {
      this.cargando = true;

      this.comprobanteDownloaderService.certificadoAfipDescargado(this.movimiento.codArticulo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/pdf';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `certificado.pdf`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
          } else {
            this.openSnackBar("El comprobante no se encuentra disponible para su descarga.");
          }

          this.cargando = false;
        }, error => {
          console.log(error);
          this.cargando = false;
        });
    }
  }

  /**
	 * Muestra un mensaje en pantalla
	 * @param message Mensaje a mostrar
	 */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de exportar a excel
   */
  exportarAExcel() {
    this.exportadorService.exportarEntregasDetalleExcel(this.movimiento);
  }

  /**
 * Función encargada de exportar a pdf
 */
  exportarAPDF() {
    this.exportadorService.exportarEntregasDetallePDF(this.movimiento);
  }
}
