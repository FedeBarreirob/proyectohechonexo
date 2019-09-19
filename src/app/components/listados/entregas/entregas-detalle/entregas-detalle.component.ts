import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { ContratosDetalleComponent } from '../../contratos/contratos-detalle/contratos-detalle.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { saveAs } from 'file-saver/FileSaver';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';

@Component({
	selector: 'app-entregas-detalle',
	templateUrl: './entregas-detalle.component.html',
	styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit, OnDestroy {

	unidadMedida: string;
	cuenta: EntidadAlg;
	contrato: ResumenContratoCompraVenta;
	cargando: boolean = false;

	movimiento: MovimientoEntrega;
	linkContrato: boolean;
	destroy$: Subject<any> = new Subject<any>();

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialog: MatDialog,
		private authenticationService: AuthenticationService,
		private dialogRef: MatDialogRef<EntregasDetalleComponent>,
		private exportadorService: EntregasExportacionesService,
		private cuentaAlgService: CuentaAlgService,
		private contratoServicio: ContratosService,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar
	) {
		this.movimiento = this.data.movimiento;
		this.linkContrato = this.data.linkContrato;
	}

	ngOnInit() {
		this.cargarUnidadMedida();
		this.cargarContrato();

		this.cuentaAlgService.cuentaSeleccionada$.subscribe(
			cuentaAlg => this.cuenta = cuentaAlg
		);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}

	// funcion que carga la unidad de medida desde el perfil 
	cargarUnidadMedida() {
		let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
		if (perfilBasico) {
			this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
		}
	}

	// funcion encargada de cerrar el modal
	salir() {
		this.dialogRef.close();
	}

	// funcion encargada de exportar a excel
	exportarAExcel() {
		this.exportadorService.exportarEntregasDetalleExcel(this.movimiento);
	}

	// funcion encargada de exportar a pdf
	exportarAPDF() {
		this.exportadorService.exportarEntregasDetallePDF(this.movimiento);
	}

	/**
	 * Función encargada de cargar el contrato vinculado al ticket
	 */
	cargarContrato() {
		this.contratoServicio.contratoResumenPorTk(this.movimiento.comprobante)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				respuesta => {
					if (respuesta.exito == true) {
						this.contrato = respuesta.datos;
					}
				},
				error => console.log(error)
			);
	}

	/**
	 * Función que muestra la info del contrato asociado
	 */
	verDetalleContrato() {
		let opciones = {
			data: this.contrato,
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%'
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
}
