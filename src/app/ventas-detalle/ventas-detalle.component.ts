import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoVenta } from '../interfaces/ventas/listado-ventas';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoVenta) { }

  ngOnInit() {
  }

}
