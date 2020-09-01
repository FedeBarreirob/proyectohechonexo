import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DownloaderUtilService } from '../../../../services/sharedServices/downloader/downloader-util.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cuenta-corriente-detalle',
  templateUrl: './cuenta-corriente-detalle.component.html',
  styleUrls: ['./cuenta-corriente-detalle.component.css']
})
export class CuentaCorrienteDetalleComponent implements OnInit, OnDestroy {

  movimiento: any;
  destroy$: Subject<any> = new Subject<any>();
  tcHoy: number;
  ivaDiff: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CuentaCorrienteDetalleComponent>,
    private downloaderUtilService: DownloaderUtilService
  ) {
    this.movimiento = this.data.movimiento;
    this.tcHoy = this.data.tc;
  }

  ngOnInit() {
    this.calcularIvaDiff();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que inicia la descarga del comprobante
   * @param movimiento Movimiento que contiene el identificador del comprobante a descargar
   */
  descargarComprobante() {
    this.comprobanteDownloaderService.comprobanteDescargado(this.movimiento.linkComprobante, this.movimiento.comprobante)
      .pipe(takeUntil(this.destroy$))
      .subscribe(respuesta => {
        var mediaType = 'application/pdf';
        var blob = new Blob([respuesta], { type: mediaType });
        var filename = `${this.movimiento.comprobante}.pdf`;

        if (blob.size !== 0) {

          if (environment.inPhonegap) {
            this.downloaderUtilService.download(filename, blob, mediaType);
          } else {
            saveAs(blob, filename);
          }

        } else {
          this.openSnackBar("El comprobante no se encuentra disponible para su descarga.", "Descarga de comprobantes");
        }

      }, error => console.log(error));
  }

	/**
   * Abre una notificación
   * @param message 
   * @param action 
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de cerrar el dialogo
   */
  salir() {
    this.dialogRef.close();
  }

  /**
   * Calcula el iva de la diferencia de cambio
   */
  calcularIvaDiff() {
    if (this.movimiento.moneda != 'P') {

      let pesificadoAHoy = this.movimiento.importeComprobanteDolares * this.tcHoy;
      let pesificadoFechaComprobante = this.movimiento.importeComprobanteDolares * this.movimiento.tipoDeCambio;

      this.ivaDiff = (pesificadoAHoy - pesificadoFechaComprobante) * 21 / 100;
    } else {
      this.ivaDiff = null;
    }
  }
}
