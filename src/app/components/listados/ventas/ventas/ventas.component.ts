import { Component, OnInit, ViewChild } from '@angular/core';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSidenav } from '@angular/material';
import { FiltroEspecieCosecha } from '../../../../interfaces/varios/filtro-especie-cosecha';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { VentasDetalleComponent } from '../ventas-detalle/ventas-detalle.component';

@Component({
	selector: 'app-ventas',
	templateUrl: './ventas.component.html',
	styleUrls: ['./ventas.component.css'],
	providers: [DatePipe]
})
export class VentasComponent implements OnInit {

	@ViewChild('menuFiltro') public sidenav: MatSidenav;

	public cuenta: EntidadAlg;
	public filtrosEspecieCosecha: FiltroEspecieCosecha;
	public cargandoFiltros: boolean;

	observerFiltroListadoMovil$ = new Subject<any>();
	observerFiltroListadoDesktop$ = new Subject<any>();
	esCelular: boolean;

	constructor(
		private ventasService: VentasService,
		public dialog: MatDialog,
		private cuentaAlgService: CuentaAlgService,
		private deviceService: DeviceDetectorService) { }

	ngOnInit() {
		this.esCelular = this.deviceService.isMobile();

		this.cuentaAlgService.cuentaSeleccionada$.subscribe(
			cuentaAlg => this.seleccionarCuenta(cuentaAlg)
		);
	}

	// funcion encargada de cargar los filtros de especie cosecha cuando se cambia la seleccion de cuenta
	cargarFiltrosEspecieCosecha() {
		if (!this.cargandoFiltros) {
			this.cargandoFiltros = true;

			let codigoEntidad = (this.cuenta) ? this.cuenta.id.codigo : null;

			this.ventasService.listadoFiltrosEspecieCosecha(codigoEntidad).subscribe(
				respuesta => {
					this.filtrosEspecieCosecha = respuesta;
					this.cargandoFiltros = false;
				}, () => { console.log("error"); this.cargandoFiltros = true; }
			);
		}
	}

	// funcion que ejecuta la carga del listado de entregas
	cargarListado(filtro: any) {

		if (this.esCelular) {
			this.observerFiltroListadoMovil$.next(filtro);
		} else {
			this.observerFiltroListadoDesktop$.next(filtro);
		}
	}

	// funcion que muestra el detalle de un movimiento seleccionado
	verDetalle(movimiento: MovimientoVenta) {

		let opciones;
		if (this.esCelular) {
			opciones = {
				data: movimiento,
				maxWidth: '100vw',
				maxHeight: '100vh',
				height: '100%',
				width: '100%'
			};
		} else {
			opciones = {
				data: movimiento,
				height: '90%',
				width: '500px'
			};
		}

		this.dialog.open(VentasDetalleComponent, opciones);
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
		this.cuenta = cuentaSeleccionada;
		this.cargarFiltrosEspecieCosecha();
	}

	// funcion encargada de mostrar u ocultar los filtros
	mostrarOcultarFiltros() {
		this.sidenav.toggle();
	}
}
