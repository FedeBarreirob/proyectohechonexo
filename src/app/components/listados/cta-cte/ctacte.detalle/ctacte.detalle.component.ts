import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { CtacteDetalleMasOperacionesComponent } from '../ctacte-detalle-mas-operaciones/ctacte-detalle-mas-operaciones.component';

@Component({
  selector: 'app-ctactedetalle',
  templateUrl: './ctacte.detalle.component.html',
  styleUrls: ['./ctacte.detalle.component.css']
})
export class CtacteDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCte,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(CtacteDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
