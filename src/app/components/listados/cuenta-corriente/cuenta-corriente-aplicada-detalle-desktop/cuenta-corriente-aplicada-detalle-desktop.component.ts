import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { Subject } from 'rxjs';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver/FileSaver';
import { takeUntil } from 'rxjs/operators';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-cuenta-corriente-aplicada-detalle-desktop',
  templateUrl: './cuenta-corriente-aplicada-detalle-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-detalle-desktop.component.css']
})
export class CuentaCorrienteAplicadaDetalleDesktopComponent implements OnInit, OnDestroy {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<MovimientoCtaCteAplicada>;

  @Input()
  tcHoy: number;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  movimiento: MovimientoCtaCteAplicada;
  ivaDiff: number;
  destroy$: Subject<any> = new Subject<any>();

  filtrosEspecieCosecha: Subject<FiltroEspecieCosecha> = new Subject<FiltroEspecieCosecha>();
  cuenta: Subject<EntidadAlg> = new Subject<EntidadAlg>();
  listadoEntregas: Array<Subject<MovimientoEntrega>> = [ new Subject<MovimientoEntrega>(), new Subject<MovimientoEntrega>(), new Subject<MovimientoEntrega>() ];

  constructor(
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar
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
  cargar(movimiento: MovimientoCtaCteAplicada) {
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
    this.comprobanteDownloaderService.comprobanteDescargado(this.movimiento.linkComprobante, this.movimiento.comprobanteAfectado)
      .pipe(takeUntil(this.destroy$))
      .subscribe(respuesta => {
        var mediaType = 'application/pdf';
        var blob = new Blob([respuesta], { type: mediaType });
        var filename = `${this.movimiento.comprobanteAfectado}.pdf`;

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
}
