import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { BoletoConfirmacionVenta } from '../../../../interfaces/contratos/boleto-confirmacion-venta';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContratoEntregasDetalleComponent } from '../contrato-entregas-detalle/contrato-entregas-detalle.component';
import { ContratoVentasDetalleComponent } from '../contrato-ventas-detalle/contrato-ventas-detalle.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DownloaderUtilService } from '../../../../../app/services/sharedServices/downloader/downloader-util.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-contratos-detalle',
  templateUrl: './contratos-detalle.component.html',
  styleUrls: ['./contratos-detalle.component.css']
})
export class ContratosDetalleComponent implements OnInit, OnDestroy {

  boleto: BoletoConfirmacionVenta;
  resumenContrato: ResumenContratoCompraVenta;
  cargando: boolean = false;
  unidadMedida: string;
  mensajeEntregasVentasPendientes: string = "";
  destroy$: Subject<any> = new Subject<any>();

  esCelular: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ResumenContratoCompraVenta,
    private dialogRef: MatDialogRef<ContratosDetalleComponent>,
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private downloaderUtilService: DownloaderUtilService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.resumenContrato = this.data;
    this.crearMensajeEntregasVentasPendientes();
    this.cargarUnidadMedida();
    this.cargarBoleto();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que carga la unidad de medida desde el perfil
   */
  cargarUnidadMedida() {
    let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
    if (perfilBasico) {
      this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  /**
   * Función encargada de cargar el boleto
   */
  cargarBoleto() {
    if (this.cargando == false) {
      this.cargando = true;

      this.contratosService.contrato(this.resumenContrato.numeroSucursalContrato, this.resumenContrato.numeroComprobanteContrato)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.boleto = respuesta.datos;
            }
            this.cargando = false;
          },
          error => {
            console.log(error);
            this.cargando = false;
          }
        );
    }
  }

  /**
   * Función encargada de cerrar el modal
   */
  salir() {
    this.dialogRef.close();
  }

  /**
   * Función encargada de crear un mensaje acorde al estado de entregas y ventas del contrato
   */
  private crearMensajeEntregasVentasPendientes() {
    let hayPendienteEntregar: boolean = this.resumenContrato.kilosPendientesEntregar != 0;
    let hayPendienteVender: boolean = this.resumenContrato.kilosAFijar != 0;

    // caso 1: Unicamente falta entregar
    if (hayPendienteEntregar && !hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Entregas pendientes";
    }

    // caso 2: Unicamente falta vender
    if (!hayPendienteEntregar && hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Ventas pendientes";
    }

    // caso 3: Falta entregar y vender
    if (hayPendienteEntregar && hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Entregas y ventas pendientes";
    }

    // caso 4: No falta nada
    if (!hayPendienteEntregar && !hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "";
    }
  }

  /**
   * Función encargada de ejecutar el proceso de generación de comprobantes para obtener un pdf del mismo
   */
  descargarComprobante() {
    if (this.cargando == false) {
      this.cargando = true;

      this.comprobanteDownloaderService.confirmacionVentaDescargado(this.resumenContrato.numeroSucursalContrato, this.resumenContrato.numeroComprobanteContrato)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          var mediaType = 'application/pdf';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `boleto.pdf`;

          if (blob.size !== 0) {

            if (environment.inPhonegap) {
              this.downloaderUtilService.download(filename, blob, mediaType);
            } else {
              saveAs(blob, filename);
            }

          } else {
            this.openSnackBar("El comprobante no se encuentra disponible para su descarga.", "Descarga de comprobantes");
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
   * @param action Otro mensaje
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Función que abre el detalle de las entregas aplicadas al contrato actual
   */
  verDetalleEntregas() {
    let opciones;
    if (this.esCelular) {
      opciones = {
        data: this.resumenContrato,
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'modal-sin-padding'
      };
    } else {
      opciones = {
        data: this.resumenContrato,
        height: '90%',
        width: '500px',
        panelClass: 'modal-sin-padding'
      };
    }

    this.dialog.open(ContratoEntregasDetalleComponent, opciones);
  }

  /**
   * Función que abre el detalle de las ventas (fijaciones) al contrato actual
   */
  verDetalleVentas() {
    let opciones;
    if (this.esCelular) {
      opciones = {
        data: this.boleto,
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'modal-sin-padding'
      };
    } else {
      opciones = {
        data: this.boleto,
        height: '90%',
        width: '500px',
        panelClass: 'modal-sin-padding'
      };
    }

    this.dialog.open(ContratoVentasDetalleComponent, opciones);
  }
}
