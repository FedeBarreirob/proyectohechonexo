import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoMercPendEntregar } from '../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { MercPendEntregarDetalleMasOperacionesComponent } from '../merc-pend-entregar-detalle-mas-operaciones/merc-pend-entregar-detalle-mas-operaciones.component';

@Component({
  selector: 'app-merc-pend-entregar-detalle',
  templateUrl: './merc-pend-entregar-detalle.component.html',
  styleUrls: ['./merc-pend-entregar-detalle.component.css']
})
export class MercPendEntregarDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoMercPendEntregar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(MercPendEntregarDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
