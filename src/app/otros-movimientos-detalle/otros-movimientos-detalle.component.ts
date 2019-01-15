import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoOtroMovimiento } from '../interfaces/otros-movimientos/listado-otros-movimientos';
import { OtrosMovimientosDetalleMasOperacionesComponent } from '../otros-movimientos-detalle-mas-operaciones/otros-movimientos-detalle-mas-operaciones.component';

@Component({
	selector: 'app-otros-movimientos-detalle',
	templateUrl: './otros-movimientos-detalle.component.html',
	styleUrls: ['./otros-movimientos-detalle.component.css']
})
export class OtrosMovimientosDetalleComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MovimientoOtroMovimiento,
		public dialog: MatDialog
	) { }

	ngOnInit() {
	}

	// funcion que muestra las operaciones extras
	verOpcionesExtras() {
		this.dialog.open(OtrosMovimientosDetalleMasOperacionesComponent, {
			data: this.data
		});
	}
}
