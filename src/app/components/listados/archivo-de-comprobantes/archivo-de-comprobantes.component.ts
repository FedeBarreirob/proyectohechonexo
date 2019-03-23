import { Component, OnInit } from '@angular/core';
import { FiltroCtaCteComprobanteDescarga } from '../../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ArchivoDeComprobantesService } from '../../../services/archivo-de-comprobantes/archivo-de-comprobantes.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserAuth } from '../../../models/security/user';
import { DatePipe } from '@angular/common';
import { ComprobanteParaDescarga } from '../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { ComprobantesDownloaderService } from '../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
	selector: 'app-archivo-de-comprobantes',
	templateUrl: './archivo-de-comprobantes.component.html',
	styleUrls: ['./archivo-de-comprobantes.component.css'],
	providers: [DatePipe]
})
export class ArchivoDeComprobantesComponent implements OnInit {

	cargando: boolean = false;
	toggleSeleccionTodo: boolean = false;

	// filtros
	esAplicada: boolean = false;
	cuenta: string;
	fechaDesde: string;
	fechaHasta: string = (new Date()).toISOString();
	filtro: string = "";

	// listado de las referencias a los comprobantes
	comprobantes: Array<ComprobanteParaDescarga> = [];
	comprobantesSeleccionados: Array<ComprobanteParaDescarga> = [];

	constructor(
		private archivoDeComprobantesService: ArchivoDeComprobantesService,
		private authenticationService: AuthenticationService,
		private datePipe: DatePipe,
		private comprobantesDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar
	) {
		this.establecerFiltrosPorDefecto();
	 }

	ngOnInit() {
	}

	// funcion encargada de cargar el listado de comprobantes
	cargarListado() {
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			this.cargando = true;
			this.limpiar();

			let filtroSrv: FiltroCtaCteComprobanteDescarga = {
				esAplicada: false,
				cuenta: this.cuenta,
				fechaDesde: this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy'),
				fechaHasta: this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy'),
				filtro: this.filtro
			};

			this.archivoDeComprobantesService.comprobantesFiltrados(filtroSrv, usuarioLogueado.token).subscribe(
				respuesta => {
					if (respuesta.exito) {
						this.comprobantes = respuesta.datos;
					} else {
						this.comprobantes = [];
					}

					this.comprobantesSeleccionados = [];
					this.toggleSeleccionTodo = false;
					this.cargando = false;
				},
				error => {
					console.log(error);
					this.cargando = false;
				}
			);
		}
	}

	// funcion que actualiza el listado de comprobantes seleccionados
	actualizarSeleccion($event) {
		this.comprobantesSeleccionados = $event;

		// actualizar estado del seleccionador de todos
		this.toggleSeleccionTodo = this.sonTodosSeleccionados();
	}

	// funcion que determina si todos los item se encuentran seleccionados
	private sonTodosSeleccionados(): boolean {
		try {
			if (this.comprobantes.length == this.comprobantesSeleccionados.length) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	// funcion encargada de seleccionar todos o ningun comprobante
	seleccionarTodoONada($event: MatSlideToggleChange) {
		if ($event.checked) {
			this.comprobantesSeleccionados = this.comprobantes;
		} else {
			this.comprobantesSeleccionados = [];
		}
	}

	// funcion que verifica si se encuentra los filtros completos para efectuar la busqueda de comprobantes
	esFiltroCompleto(): boolean {
		if (this.cuenta && this.fechaDesde && this.fechaHasta) {
			return true;
		} else {
			return false;
		}
	}

	// funcion encargada de ejecutar el proceso de descarga
	descargar() {
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			this.cargando = true;

			this.comprobantesDownloaderService.comprobanteDescargadoMasivo(this.comprobantesSeleccionados, usuarioLogueado.token)
				.subscribe(respuesta => {
					var mediaType = 'application/zip';
					var blob = new Blob([respuesta], { type: mediaType });
					var filename = 'comprobantes.zip';

					if (blob.size !== 0) {
						saveAs(blob, filename);
					} else {
						this.openSnackBar("Ninguno de los comprobantes indicados se encuentran para su descarga.", "Descarga de comprobantes");
					}

					this.cargando = false;
				}, error => {
					console.log(error);
					this.cargando = false;
				});
		}
	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	// funcion que acomoda los filtros a default
	establecerFiltrosPorDefecto() {
		let sieteDiasAtras: Date = new Date();
		sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);
		this.fechaDesde = sieteDiasAtras.toISOString();

		this.fechaHasta = (new Date()).toISOString();
	}

	// funcion encargada de limpiar para nueva generacion
	limpiar() {
		this.comprobantes = [];
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: string) {
		this.cuenta = cuentaSeleccionada;
		this.establecerFiltrosPorDefecto();
		this.cargarListado();
	}
}
