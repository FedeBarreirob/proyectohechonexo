import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OtrosMovimientosExportacionesService } from '../../../../services/otros-movimientos/otros-movimientos-exportaciones.service';
import { MovimientoOtroMovimiento, TotalOtrosMovimientos } from '../../../../interfaces/otros-movimientos/listado-otros-movimientos';

@Component({
	selector: 'app-otros-movimientos-mas-operaciones',
	templateUrl: './otros-movimientos-mas-operaciones.component.html',
	styleUrls: ['./otros-movimientos-mas-operaciones.component.css']
})
export class OtrosMovimientosMasOperacionesComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private exportacionesService: OtrosMovimientosExportacionesService
	) { }

	ngOnInit() {
	}

	// funcion encargada de exportar el listado a excel
	exportarAExcel() {
		let movimientos: Array<MovimientoOtroMovimiento> = this.data.movimientos;
		this.exportacionesService.exportarListadoVentasDetalleExcel(movimientos);
	}

	// funcion encargada de exportar el listado a pdf
	exportarAPDF() {
		let movimientos: Array<MovimientoOtroMovimiento> = this.data.movimientos;
		let totales: TotalOtrosMovimientos = this.data.totales;
		this.exportacionesService.exportarListadoVentasDetallePDF(movimientos, totales);
	}
}
