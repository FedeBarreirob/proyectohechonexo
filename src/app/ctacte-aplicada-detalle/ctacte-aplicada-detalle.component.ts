import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoCtaCteAplicada } from '../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { CtaCteAplicadaDetalleMasOperacionesComponent } from '../cta-cte-aplicada-detalle-mas-operaciones/cta-cte-aplicada-detalle-mas-operaciones.component';

@Component({
  selector: 'app-ctacte-aplicada-detalle',
  templateUrl: './ctacte-aplicada-detalle.component.html',
  styleUrls: ['./ctacte-aplicada-detalle.component.css']
})
export class CtacteAplicadaDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCteAplicada,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(CtaCteAplicadaDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
