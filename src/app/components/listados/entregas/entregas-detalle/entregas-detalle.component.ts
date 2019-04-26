import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasDetalleMasOperacionesComponent } from '../entregas-detalle-mas-operaciones/entregas-detalle-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';

@Component({
	selector: 'app-entregas-detalle',
	templateUrl: './entregas-detalle.component.html',
	styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit {

	public unidadMedida: string;
	public cuenta: EntidadAlg;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega,
		public dialog: MatDialog,
		private authenticationService: AuthenticationService,
		private dialogRef: MatDialogRef<EntregasDetalleComponent>,
		private exportadorService: EntregasExportacionesService,
		private cuentaAlgService: CuentaAlgService
	) { }

	ngOnInit() {
		this.cargarUnidadMedida();

		this.cuentaAlgService.cuentaSeleccionada$.subscribe(
			cuentaAlg => this.cuenta = cuentaAlg
		);
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

	// funcion encargada de cerrar el modal
	salir() {
		this.dialogRef.close();
	}

	// funcion encargada de exportar a excel
	exportarAExcel() {
		this.exportadorService.exportarEntregasDetalleExcel(this.data);
	}

	// funcion encargada de exportar a pdf
	exportarAPDF() {
		this.exportadorService.exportarEntregasDetallePDF(this.data);
	}
}
