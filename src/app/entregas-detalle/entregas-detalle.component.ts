import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoEntrega } from '../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-detalle',
  templateUrl: './entregas-detalle.component.html',
  styleUrls: ['./entregas-detalle.component.css']
})
export class EntregasDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoEntrega) { }

  ngOnInit() {
  }

}
