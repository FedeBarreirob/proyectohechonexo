import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';
import { takeUntil } from 'rxjs/operators';
import { ContratosDetalleComponent } from '../../contratos/contratos-detalle/contratos-detalle.component';
import { saveAs } from 'file-saver/FileSaver';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { VentasExportacionesService } from '../../../../services/ventas/ventas-exportaciones.service';

@Component({
  selector: 'app-ventas-detalle-desktop',
  templateUrl: './ventas-detalle-desktop.component.html',
  styleUrls: ['./ventas-detalle-desktop.component.css']
})
export class VentasDetalleDesktopComponent implements OnInit, OnDestroy {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<FijacionVenta>;

  @Input()
  filtrarPorContrato: boolean = false;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  unidadMedida: string;
  destroy$: Subject<any> = new Subject<any>();
  movimiento: FijacionVenta;
  cuenta: EntidadAlg;
  contrato: ResumenContratoCompraVenta;
  cargando: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService,
    private contratoServicio: ContratosService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private exportadorService: VentasExportacionesService
  ) { }

  ngOnInit() {
    this.cargarUnidadMedida();

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
  * Función que carga la unidad de medida desde el perfil
  */
  cargarUnidadMedida() {
    let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
    if (perfilBasico) {
      this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  /**
   * Función encargada de cargar todos los datos
   * @param movimiento 
   */
  cargar(movimiento: FijacionVenta) {
    this.movimiento = movimiento;
    this.cargarContrato();
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
  cargarContrato() {
    this.cargando = true;
    this.contratoServicio.contratoResumenPorId(this.movimiento.contratoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.contrato = respuesta.datos;
          }

          this.cargando = false;
        },
        error => {
          console.log(error);
          this.cargando = false;
        }
      );
  }

  /**
	 * Función que muestra la info del contrato asociado
	 */
  verDetalleContrato() {
    let opciones = {
      data: this.contrato,
      height: '90%',
      width: '500px'
    };

    this.dialog.open(ContratosDetalleComponent, opciones);
  }

  /**
   * Función encargada de ejecutar el proceso de generación de comprobantes para obtener un pdf del mismo
   */
  descargarComprobante() {
    if (this.cargando == false) {
      this.cargando = true;

      this.comprobanteDownloaderService.confirmacionVentaDescargado(this.contrato.numeroSucursalContrato, this.contrato.numeroComprobanteContrato)
        .pipe(takeUntil(this.destroy$))
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

  /**
   * Función encargada de exportar a excel
   */
  exportarAExcel() {
    this.exportadorService.exportarVentasDetalleExcel(this.movimiento);
  }

	/**
   * Función encargada de exportar a pdf
   */
  exportarAPDF() {
    this.exportadorService.exportarVentasDetallePDF(this.movimiento);
  }
}
