import { Component, OnInit, Inject } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { BoletoConfirmacionVenta } from '../../../../interfaces/contratos/boleto-confirmacion-venta';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-contratos-detalle',
  templateUrl: './contratos-detalle.component.html',
  styleUrls: ['./contratos-detalle.component.css']
})
export class ContratosDetalleComponent implements OnInit {

  boleto: BoletoConfirmacionVenta;
  resumenContrato: ResumenContratoCompraVenta;
  cargando: boolean = false;
  unidadMedida: string;
  mensajeEntregasVentasPendientes: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ResumenContratoCompraVenta,
    private dialogRef: MatDialogRef<ContratosDetalleComponent>,
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resumenContrato = this.data;
    this.crearMensajeEntregasVentasPendientes();
    this.cargarUnidadMedida();
    this.cargarBoleto();
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
        .subscribe(respuesta => {
          var mediaType = 'application/pdf';
          var blob = new Blob([respuesta], { type: mediaType });
          var filename = `boleto.pdf`;

          if (blob.size !== 0) {
            saveAs(blob, filename);
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
}
