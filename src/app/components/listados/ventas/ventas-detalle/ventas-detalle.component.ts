import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { VentasDetalleMasOperacionesComponent } from '../ventas-detalle-mas-operaciones/ventas-detalle-mas-operaciones.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';

@Component({
	selector: 'app-ventas-detalle',
	templateUrl: './ventas-detalle.component.html',
	styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

	public unidadMedida: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoVenta,
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
		this.dialog.open(VentasDetalleMasOperacionesComponent, {
			data: this.data
		});
	}
}
