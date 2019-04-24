import { Component, OnInit, ViewChild } from '@angular/core';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { MovimientoEntrega, EntregasTotales, MovimientoEntregaAgrupadoPorCampo } from '../../../../interfaces/entregas/listado-entregas';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { UserAuth } from '../../../../models/security/user';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSidenav } from '@angular/material';
import { EntregasDetalleComponent } from '../entregas-detalle/entregas-detalle.component';
import { EntregasMasOperacionesComponent } from '../entregas-mas-operaciones/entregas-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';

@Component({
	selector: 'app-entregas',
	templateUrl: './entregas.component.html',
	styleUrls: ['./entregas.component.css'],
	providers: [DatePipe]
})
export class EntregasComponent implements OnInit {

	@ViewChild('menuFiltro') public sidenav: MatSidenav;

	public listadoEntregas: Array<MovimientoEntrega>;
	private movimientoSeleccionado: MovimientoEntrega = null;
	public totales: EntregasTotales = null;
	public cargando: boolean;

	public listadoEntregasAgrupadasPorCampo: Array<MovimientoEntregaAgrupadoPorCampo>;

	public cuenta: EntidadAlg;
	public perfilBasico: PerfilBasico;
	public fechaDesde: string;
	public fechaHasta: string = (new Date()).toISOString();
	public unidadMedida: string;

	public filtrosEspecieCosecha: FiltroEspecieCosecha;
	public filtroEspecieCosechaSeleccionado: FiltroEspecieCosecha = null;
	public cargandoFiltros: boolean;

	constructor(private entregasService: EntregasService,
		private authenticationService: AuthenticationService,
		private datePipe: DatePipe,
		public dialog: MatDialog,
		private cuentaAlgService: CuentaAlgService
	) {
		this.establecerFiltrosPorDefecto();
	}

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
				this.cargarUnidadMedida()
			});

		this.cargarUnidadMedida();

		this.cuentaAlgService.cuentaSeleccionada$.subscribe(
			cuentaAlg => this.seleccionarCuenta(cuentaAlg)
		);
	}

	// funcion que carga la unidad de medida desde el perfil 
	cargarUnidadMedida() {
		if (this.perfilBasico) {
			this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
		}
	}

	// funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
	cargarFiltrosEspecieCosecha() {
		this.cargandoFiltros = true;
		this.filtroEspecieCosechaSeleccionado = null;
		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		let codigoEntidad = (this.cuenta) ? this.cuenta.id.codigo : null;

		this.entregasService.listadoFiltrosEspecieCosecha(codigoEntidad, usuarioLogueado.token).subscribe(
			respuesta => {
				this.filtrosEspecieCosecha = respuesta;
				this.cargandoFiltros = false;
			}, error => { console.log("error"); this.cargandoFiltros = true; }
		);
	}

	// funcion que ejecuta la carga del listado de entregas
	cargarListado(filtro: any) {
		console.log(filtro);
		this.cargando = true;
		this.limpiar();

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null) {
			return this.entregasService.listadoEntregas(filtro, usuarioLogueado.token).subscribe(respuesta => {
				this.listadoEntregas = respuesta.datos.listado;
				this.listadoEntregasAgrupadasPorCampo = respuesta.datos.listadoAgrupadoPorCampo;
				this.totales = respuesta.datos.totales;

				this.cargando = false;
			}, error => {
				this.cargando = false;
			});
		}
	}

	// funcion que muestra el detalle de un movimiento seleccionado
	verDetalle(movimiento: MovimientoEntrega) {
		this.movimientoSeleccionado = movimiento;

		this.dialog.open(EntregasDetalleComponent, {
			data: movimiento
		});
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(EntregasMasOperacionesComponent, {
			data: {
				movimientos: this.listadoEntregas,
				totales: this.totales
			}
		});
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
		this.cuenta = cuentaSeleccionada;
		this.cargarFiltrosEspecieCosecha();
		this.establecerFiltrosPorDefecto();
		//this.cargarListado();
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
		this.listadoEntregas = [];
		this.listadoEntregasAgrupadasPorCampo = [];
		this.totales = null;
	}

	// funcion encargada de mostrar u ocultar los filtros
	mostrarOcultarFiltros($event) {
		this.sidenav.toggle();
	}
}
