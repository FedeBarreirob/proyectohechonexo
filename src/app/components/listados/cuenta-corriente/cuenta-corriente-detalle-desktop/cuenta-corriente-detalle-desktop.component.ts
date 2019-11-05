import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { CtaCteExportacionesService } from '../../../../services/ctacte/cta-cte-exportaciones.service';

@Component({
  selector: 'app-cuenta-corriente-detalle-desktop',
  templateUrl: './cuenta-corriente-detalle-desktop.component.html',
  styleUrls: ['./cuenta-corriente-detalle-desktop.component.css']
})
export class CuentaCorrienteDetalleDesktopComponent implements OnInit, OnDestroy {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<MovimientoCtaCte>;

  @Input()
  tcHoy: number;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  movimiento: MovimientoCtaCte;
  ivaDiff: number;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private exportacionesService: CtaCteExportacionesService
  ) { }

  ngOnInit() {
    this.modoDetalleDesktopMovimiento$.subscribe(
      movimiento => {
        this.cargar(movimiento);
        this.calcularIvaDiff();
      }
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
  cargar(movimiento: MovimientoCtaCte) {
    this.movimiento = movimiento;
  }

  /**
   * Cierra el detalle
   */
  cerrar() {
    this.salir.next();
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
          saveAs(blob, filename);
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
   * Exporta el detalle a excel
   */
  exportarAExcel() {
    this.exportacionesService.exportarMovCtaCteDetalleExcel(this.movimiento);
  }

  /**
   * Exporta el detalle a pdf
   */
  exportarAPDF() {
    this.exportacionesService.exportarMovCtaCteDetallePDF(this.movimiento);
  }
}
