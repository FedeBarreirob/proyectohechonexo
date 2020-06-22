import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ContratosDetalleComponent } from '../../contratos/contratos-detalle/contratos-detalle.component';
import { saveAs } from 'file-saver/FileSaver';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';

@Component({
  selector: 'app-entregas-detalle-desktop',
  templateUrl: './entregas-detalle-desktop.component.html',
  styleUrls: ['./entregas-detalle-desktop.component.css']
})
export class EntregasDetalleDesktopComponent implements OnInit, OnDestroy {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<MovimientoEntrega>;

  @Input()
  aplicado: boolean = false;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  unidadMedida: string;
  destroy$: Subject<any> = new Subject<any>();
  movimiento: MovimientoEntrega;
  cuenta: EntidadAlg;
  contrato: ResumenContratoCompraVenta;
  cargando: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService,
    private contratoServicio: ContratosService,
    public dialog: MatDialog,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private snackBar: MatSnackBar,
    private exportadorService: EntregasExportacionesService
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
  cargar(movimiento: MovimientoEntrega) {
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
    this.contratoServicio.contratoResumenPorTk(this.movimiento.comprobante)
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
	 * Descarga el certificado desde afip
	 */
  descargarCertificado() {
    if (this.cargando == false) {
      this.cargando = true;

      this.comprobanteDownloaderService.certificadoAfipDescargado(this.movimiento.n1116A)
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
