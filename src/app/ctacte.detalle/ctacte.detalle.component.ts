import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';

@Component({
  selector: 'app-ctactedetalle',
  templateUrl: './ctacte.detalle.component.html',
  styleUrls: ['./ctacte.detalle.component.css']
})
export class CtacteDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCte) { }

  ngOnInit() {
  }

}
