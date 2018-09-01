import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoCtaCteAplicada } from '../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-ctacte-aplicada-detalle',
  templateUrl: './ctacte-aplicada-detalle.component.html',
  styleUrls: ['./ctacte-aplicada-detalle.component.css']
})
export class CtacteAplicadaDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoCtaCteAplicada) { }

  ngOnInit() {
  }

}
