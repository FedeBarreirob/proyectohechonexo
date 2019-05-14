import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { VentasExportacionesService } from '../../../../services/ventas/ventas-exportaciones.service';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { ContratosDetalleComponent } from '../../contratos/contratos-detalle/contratos-detalle.component';

@Component({
	selector: 'app-ventas-detalle',
	templateUrl: './ventas-detalle.component.html',
	styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

	public unidadMedida: string;
	contrato: ResumenContratoCompraVenta;

	movimiento: FijacionVenta;
	linkContrato: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialog: MatDialog,
		private authenticationService: AuthenticationService,
		private dialogRef: MatDialogRef<VentasDetalleComponent>,
		private exportadorService: VentasExportacionesService,
		private contratoServicio: ContratosService
	) {
		this.movimiento = this.data.movimiento;
		this.linkContrato = this.data.linkContrato;
	}

	ngOnInit() {
		this.cargarUnidadMedida();
		this.cargarContrato();
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
		//this.exportadorService.exportarVentasDetalleExcel(this.data);
	}

	// funcion encargada de exportar a pdf
	exportarAPDF() {
		//this.exportadorService.exportarVentasDetallePDF(this.data);
	}

	/**
	 * Función encargada de cargar el contrato a partir de su id
	 */
	cargarContrato() {
		this.contratoServicio.contratoResumenPorId(this.movimiento.contratoId).subscribe(
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
