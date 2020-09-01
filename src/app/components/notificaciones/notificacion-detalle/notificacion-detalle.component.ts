import { Component, OnInit, Inject } from '@angular/core';
import { Notificacion } from '../../../interfaces/notificaciones/notificacion';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { ComprobantesDownloaderService } from '../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { ComprobanteNovedad } from '../../../interfaces/notificaciones/comprobante-novedad';
import { UserAuth } from '../../../models/security/user';
import { saveAs } from 'file-saver/FileSaver';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';
import { ConfirmacionDeVentaNovedad } from '../../../interfaces/notificaciones/confirmacion-de-venta-novedad';
import { DownloaderUtilService } from '../../../services/sharedServices/downloader/downloader-util.service';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-notificacion-detalle',
	templateUrl: './notificacion-detalle.component.html',
	styleUrls: ['./notificacion-detalle.component.css']
})
export class NotificacionDetalleComponent implements OnInit {

	perfilBasico: PerfilBasico;
	private usuarioLogueado: UserAuth;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Notificacion,
		private authenticationService: AuthenticationService,
		private notificacionService: NotificacionesService,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar,
		private downloaderUtilService: DownloaderUtilService
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
			});

		this.marcarComoLeido();
	}

	// funcion que inicia la descarga del comprobante
	descargarComprobante(comprobante: ComprobanteNovedad) {
		this.comprobanteDownloaderService.comprobanteDescargado(comprobante.link, comprobante.comprobante)
			.subscribe(respuesta => {
				var mediaType = 'application/pdf';
				var blob = new Blob([respuesta], { type: mediaType });
				var filename = `${comprobante.comprobante}.pdf`;

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

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	// funcion encargada de marcar como leido a la notificacion una vez abierto
	marcarComoLeido() {
		let notificacionModificada: Notificacion = {
			id: this.data.id,
			estado: EstadoNotificaciones.LEIDO
		};

		if (this.usuarioLogueado != null) {
			this.notificacionService.marcarNotificacion(
				notificacionModificada)
				.subscribe(respuesta => {

					if (respuesta.exito) {
						this.notificacionService.huboCambiosEnEstado();
					}

				}, error => console.log(error));
		}
	}

	// funcion que inicia la descarga del comprobante de confirmacion de venta
	descargarConfirmacionVenta(confirmacionVenta: ConfirmacionDeVentaNovedad) {
		this.comprobanteDownloaderService.confirmacionVentaDescargado(confirmacionVenta.sucursal, confirmacionVenta.numeroComprobante)
			.subscribe(respuesta => {
				var mediaType = 'application/pdf';
				var blob = new Blob([respuesta], { type: mediaType });
				var filename = `${confirmacionVenta.comprobante}.pdf`;

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
}
