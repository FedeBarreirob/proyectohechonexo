import { Component, OnInit } from '@angular/core';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service'
import { MovimientoCtaCteAplicada, SaldosTotales } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FiltroCtacteAplicada } from '../../../../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { UserAuth } from '../../../../models/security/user';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CtacteAplicadaDetalleComponent } from '../ctacte-aplicada-detalle/ctacte-aplicada-detalle.component';
import { CtaCteAplicadaMasOperacionesComponent } from '../cta-cte-aplicada-mas-operaciones/cta-cte-aplicada-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
	selector: 'app-ctacte-aplicada',
	templateUrl: './ctacte-aplicada.component.html',
	styleUrls: ['./ctacte-aplicada.component.css'],
	providers: [DatePipe]
})
export class CtacteAplicadaComponent implements OnInit {

	public listadoCtaCte: Array<MovimientoCtaCteAplicada>;
	private movimientoSeleccionado: MovimientoCtaCteAplicada = null;
	public saldosTotales: SaldosTotales = null;
	public cargando: boolean;

	public cuenta: string = "";
	public perfilBasico: PerfilBasico;
	public fechaDesde: Date = new Date();
	public fechaHasta: Date = new Date();

	constructor(private ctacteService: CtacteAplicadaService,
		private authenticationService: AuthenticationService,
		private datePipe: DatePipe,
		public dialog: MatDialog,
		private comprobanteDownloaderService: ComprobantesDownloaderService,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => this.perfilBasico = perfil);
	}

	// funcion que ejecuta la carga del listado de ctacte
	cargarListado() {
		this.cargando = true;

		let filtro: FiltroCtacteAplicada = {
			cuenta: this.cuenta,
			fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
			fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
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
		}
	}

	// funcion que muestra el detalle de un movimiento seleccionado
	verDetalle(movimiento: MovimientoCtaCteAplicada) {
		this.movimientoSeleccionado = movimiento;

		this.dialog.open(CtacteAplicadaDetalleComponent, {
			data: movimiento
		});
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(CtaCteAplicadaMasOperacionesComponent, {
			data: {
				movimientos: this.listadoCtaCte,
				saldos: this.saldosTotales
			}
		});
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: string) {
		this.cuenta = cuentaSeleccionada;
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
