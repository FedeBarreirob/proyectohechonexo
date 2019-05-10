import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { ContratosDetalleComponent } from '../../contratos/contratos-detalle/contratos-detalle.component';

@Component({
	selector: 'app-entregas-detalle',
	templateUrl: './entregas-detalle.component.html',
	styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit {

	unidadMedida: string;
	cuenta: EntidadAlg;
	contrato: ResumenContratoCompraVenta;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega,
		public dialog: MatDialog,
		private authenticationService: AuthenticationService,
		private dialogRef: MatDialogRef<EntregasDetalleComponent>,
		private exportadorService: EntregasExportacionesService,
		private cuentaAlgService: CuentaAlgService,
		private contratoServicio: ContratosService
	) { }

	ngOnInit() {
		this.cargarUnidadMedida();
		this.cargarContrato();

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

	/**
	 * Función encargada de cargar el presupuesto vinculado al ticket
	 */
	cargarContrato() {
		this.contratoServicio.contratoResumenPorTk(this.data.comprobante).subscribe(
			respuesta => {
				if (respuesta.exito == true) {
					this.contrato = respuesta.datos;
				}
			},
			error => console.log(error)
		);
	}

	/**
	 * Función que muestra la info del contrato asociado
	 */
	verDetalleContrato() {
		let opciones = {
			data: this.contrato,
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%'
		};

		this.dialog.open(ContratosDetalleComponent, opciones);
	}
}
