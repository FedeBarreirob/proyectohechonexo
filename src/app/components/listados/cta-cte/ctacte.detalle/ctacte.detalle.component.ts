import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { CtacteDetalleMasOperacionesComponent } from '../ctacte-detalle-mas-operaciones/ctacte-detalle-mas-operaciones.component';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { UserAuth } from '../../../../models/security/user';
import { saveAs } from 'file-saver/FileSaver';

@Component({
	selector: 'app-ctactedetalle',
	templateUrl: './ctacte.detalle.component.html',
	styleUrls: ['./ctacte.detalle.component.css']
})
export class CtacteDetalleComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCte,
		public dialog: MatDialog,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(CtacteDetalleMasOperacionesComponent, {
			data: this.data
		});
	}

	// funcion que inicia la descarga del comprobante
	descargarComprobante(movimiento: MovimientoCtaCte) {
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			this.comprobanteDownloaderService.comprobanteDescargado(movimiento.linkComprobante, movimiento.comprobante, usuarioLogueado.token)
				.subscribe(respuesta => {
					var mediaType = 'application/pdf';
					var blob = new Blob([respuesta], { type: mediaType });
					var filename = `${movimiento.comprobante}.pdf`;

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
