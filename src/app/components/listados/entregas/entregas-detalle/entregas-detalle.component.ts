import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasDetalleMasOperacionesComponent } from '../entregas-detalle-mas-operaciones/entregas-detalle-mas-operaciones.component';

@Component({
  selector: 'app-entregas-detalle',
  templateUrl: './entregas-detalle.component.html',
  styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(EntregasDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
