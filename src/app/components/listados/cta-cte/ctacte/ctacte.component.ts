import { Component, OnInit } from '@angular/core';
import { CtacteService } from '../../../../services/ctacte/ctacte.service'
import { MovimientoCtaCte, SaldosTotales } from '../../../../interfaces/ctacte/listado.ctacte';
import { FiltroListadoCtaCte } from '../../../../interfaces/ctacte/filtro.listado.ctacte';
import { UserAuth } from '../../../../models/security/user';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CtacteDetalleComponent } from '../ctacte.detalle/ctacte.detalle.component';
import { CtacteMasOperacionesComponent } from '../ctacte-mas-operaciones/ctacte-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
	selector: 'app-ctacte',
	templateUrl: './ctacte.component.html',
	styleUrls: ['./ctacte.component.css'],
	providers: [DatePipe]
})
export class CtacteComponent implements OnInit {

	public listadoCtaCte: Array<MovimientoCtaCte>;
	private movimientoSeleccionado: MovimientoCtaCte = null;
	public saldosTotales: SaldosTotales = null;
	public cargando: boolean;

	public cuenta: string = "";
	public perfilBasico: PerfilBasico;
	public fechaDesde: string;
	public fechaHasta: string = (new Date()).toISOString();

	constructor(
		private ctacteService: CtacteService,
		private authenticationService: AuthenticationService,
		private datePipe: DatePipe,
		public dialog: MatDialog,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar
	) {
		this.establecerFiltrosPorDefecto();
	}

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => this.perfilBasico = perfil);
	}

	// funcion que ejecuta la carga del listado de ctacte
	cargarListado() {
		/*this.cargando = true;
		this.limpiar();

		let filtro: FiltroListadoCtaCte = {
			cuenta: this.cuenta,
			fechaDesde: this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy'),
			fechaHasta: this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy')
		}

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			return this.ctacteService.listadoCtaCte(filtro, usuarioLogueado.token).subscribe(respuesta => {
				this.listadoCtaCte = respuesta.datos.listado;
				this.saldosTotales = respuesta.datos.saldosTotales;

				this.cargando = false;
			}, error => {
				this.cargando = false;
			});
		}*/
	}

	// funcion que muestra el detalle de un movimiento seleccionado
	verDetalle(movimiento: MovimientoCtaCte) {
		this.movimientoSeleccionado = movimiento;

		this.dialog.open(CtacteDetalleComponent, {
			data: movimiento
		});
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(CtacteMasOperacionesComponent, {
			data: {
				movimientos: this.listadoCtaCte,
				saldos: this.saldosTotales
			}
		});
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: string) {
		this.cuenta = cuentaSeleccionada;
		this.establecerFiltrosPorDefecto();
		this.cargarListado();
	}

	// funcion que inicia la descarga del comprobante
	descargarComprobante(movimiento: MovimientoCtaCte) {
		this.comprobanteDownloaderService.comprobanteDescargado(movimiento.linkComprobante, movimiento.comprobante)
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
		this.listadoCtaCte = [];
		this.saldosTotales = null;
	}
}
