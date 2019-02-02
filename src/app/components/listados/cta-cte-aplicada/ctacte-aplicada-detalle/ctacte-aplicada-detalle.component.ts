import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { CtaCteAplicadaDetalleMasOperacionesComponent } from '../cta-cte-aplicada-detalle-mas-operaciones/cta-cte-aplicada-detalle-mas-operaciones.component';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { UserAuth } from '../../../../models/security/user';
import { saveAs } from 'file-saver/FileSaver';

@Component({
	selector: 'app-ctacte-aplicada-detalle',
	templateUrl: './ctacte-aplicada-detalle.component.html',
	styleUrls: ['./ctacte-aplicada-detalle.component.css']
})
export class CtacteAplicadaDetalleComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCteAplicada,
		public dialog: MatDialog,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(CtaCteAplicadaDetalleMasOperacionesComponent, {
			data: this.data
		});
	}

	// funcion que inicia la descarga del comprobante
	descargarComprobante(movimiento: MovimientoCtaCteAplicada) {
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			this.comprobanteDownloaderService.comprobanteDescargado(movimiento.linkComprobante, movimiento.comprobanteAfectado, usuarioLogueado.token)
				.subscribe(respuesta => {
					var mediaType = 'application/pdf';
					var blob = new Blob([respuesta], { type: mediaType });
					var filename = `${movimiento.comprobanteAfectado}.pdf`;

					if (blob.size !== 0) {
						saveAs(blob, filename);
					} else {
						this.openSnackBar("El comprobante no se encuentra disponible para su descarga.", "Descarga de comprobantes");
					}

				}, error => console.log(error));
		}
	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
