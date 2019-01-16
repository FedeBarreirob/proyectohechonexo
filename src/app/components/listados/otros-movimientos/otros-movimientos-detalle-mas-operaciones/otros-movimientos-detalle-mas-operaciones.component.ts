import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoOtroMovimiento } from '../../../../interfaces/otros-movimientos/listado-otros-movimientos';
import { OtrosMovimientosExportacionesService } from '../../../../services/otros-movimientos/otros-movimientos-exportaciones.service';

@Component({
	selector: 'app-otros-movimientos-detalle-mas-operaciones',
	templateUrl: './otros-movimientos-detalle-mas-operaciones.component.html',
	styleUrls: ['./otros-movimientos-detalle-mas-operaciones.component.css']
})
export class OtrosMovimientosDetalleMasOperacionesComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoOtroMovimiento,
		private exportadorService: OtrosMovimientosExportacionesService
	) { }

	ngOnInit() {
	}

	// funcion encargada de exportar a excel
	exportarAExcel() {
		this.exportadorService.exportarVentasDetalleExcel(this.data);
	}

	// funcion encargada de exportar a pdf
	exportarAPDF() {
		this.exportadorService.exportarVentasDetallePDF(this.data);
	}
}
