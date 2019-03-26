import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoOtroMovimiento } from '../../../../interfaces/otros-movimientos/listado-otros-movimientos';
import { OtrosMovimientosDetalleMasOperacionesComponent } from '../otros-movimientos-detalle-mas-operaciones/otros-movimientos-detalle-mas-operaciones.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';

@Component({
	selector: 'app-otros-movimientos-detalle',
	templateUrl: './otros-movimientos-detalle.component.html',
	styleUrls: ['./otros-movimientos-detalle.component.css']
})
export class OtrosMovimientosDetalleComponent implements OnInit {

	public unidadMedida: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoOtroMovimiento,
		public dialog: MatDialog,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.cargarUnidadMedida();
	}

	// funcion que carga la unidad de medida desde el perfil 
	cargarUnidadMedida() {
		let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
		if (perfilBasico) {
			this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
		}
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(OtrosMovimientosDetalleMasOperacionesComponent, {
			data: this.data
		});
	}
}
