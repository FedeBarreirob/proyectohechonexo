import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasDetalleMasOperacionesComponent } from '../entregas-detalle-mas-operaciones/entregas-detalle-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
	selector: 'app-entregas-detalle',
	templateUrl: './entregas-detalle.component.html',
	styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit {

	public unidadMedida: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega,
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
		this.dialog.open(EntregasDetalleMasOperacionesComponent, {
			data: this.data
		});
	}
}
