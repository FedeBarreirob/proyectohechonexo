import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoVenta } from '../interfaces/ventas/listado-ventas';
import { VentasDetalleMasOperacionesComponent } from '../ventas-detalle-mas-operaciones/ventas-detalle-mas-operaciones.component';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoVenta,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(VentasDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
