import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MovimientoOtroMovimiento, TotalOtrosMovimientos } from '../../../../interfaces/otros-movimientos/listado-otros-movimientos';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { OtrosMovimientosService } from '../../../../services/otros-movimientos/otros-movimientos.service';
import { UserAuth } from '../../../../models/security/user';
import { FiltroOtrosMovimientos } from '../../../../interfaces/otros-movimientos/filtro-otros-movimientos';
import { OtrosMovimientosDetalleComponent } from '../otros-movimientos-detalle/otros-movimientos-detalle.component';
import { OtrosMovimientosMasOperacionesComponent } from '../otros-movimientos-mas-operaciones/otros-movimientos-mas-operaciones.component';

@Component({
	selector: 'app-otros-movimientos',
	templateUrl: './otros-movimientos.component.html',
	styleUrls: ['./otros-movimientos.component.css'],
	providers: [DatePipe]
})
export class OtrosMovimientosComponent implements OnInit {

	public listado: Array<MovimientoOtroMovimiento>;
	private movimientoSeleccionado: MovimientoOtroMovimiento = null;
	public totales: TotalOtrosMovimientos = null;
	public cargando: boolean;

	public cuenta: string = "";
	public perfilBasico: PerfilBasico;
	public fechaDesde: string;
	public fechaHasta: string = (new Date()).toISOString();

	public filtrosEspecieCosecha: Array<FiltroEspecieCosecha> = [];
	public filtroEspecieCosechaSeleccionado: FiltroEspecieCosecha = null;
	public cargandoFiltros: boolean;

	constructor(
		private otrosMovimientosService: OtrosMovimientosService,
		private authenticationService: AuthenticationService,
		private datePipe: DatePipe,
		public dialog: MatDialog
	) {
		this.establecerFiltrosPorDefecto();
	 }

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => this.perfilBasico = perfil);
	}

	// funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
	cargarFiltrosEspecieCosecha() {
		this.cargandoFiltros = true;
		this.filtroEspecieCosechaSeleccionado = null;
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		this.otrosMovimientosService.listadoFiltrosEspecieCosecha(this.cuenta, usuarioLogueado.token).subscribe(
			respuesta => {
				this.filtrosEspecieCosecha = respuesta;
				this.cargandoFiltros = false;
			}, error => { console.log("error"); this.cargandoFiltros = true; }
		);
	}

	// funcion que ejecuta la carga del listado de ventas
	cargarListado() {
		this.cargando = true;
		this.limpiar();

		let filtro: FiltroOtrosMovimientos = {
			cuenta: this.cuenta,
			fechaDesde: this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy'),
			fechaHasta: this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy'),
			filtroEspecieCosechaDTO: this.filtroEspecieCosechaSeleccionado
		}

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			return this.otrosMovimientosService.listado(filtro, usuarioLogueado.token).subscribe(respuesta => {
				this.listado = respuesta.datos.listado;
				this.totales = respuesta.datos.totales;

				this.cargando = false;
			}, error => {
				this.cargando = false;
			});
		}
	}

	// funcion que muestra el detalle de un movimiento seleccionado
	verDetalle(movimiento: MovimientoOtroMovimiento) {
		this.movimientoSeleccionado = movimiento;

		this.dialog.open(OtrosMovimientosDetalleComponent, {
			data: movimiento
		});
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(OtrosMovimientosMasOperacionesComponent, {
			data: {
				movimientos: this.listado,
				totales: this.totales
			}
		});
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: string) {
		this.cuenta = cuentaSeleccionada;
		this.cargarFiltrosEspecieCosecha();
		this.establecerFiltrosPorDefecto();
		this.cargarListado();
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
		this.listado = [];
		this.totales = null;
	}
}
