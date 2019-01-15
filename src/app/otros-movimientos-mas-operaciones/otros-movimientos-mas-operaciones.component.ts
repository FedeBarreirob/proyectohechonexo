import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-otros-movimientos-mas-operaciones',
  templateUrl: './otros-movimientos-mas-operaciones.component.html',
  styleUrls: ['./otros-movimientos-mas-operaciones.component.css']
})
export class OtrosMovimientosMasOperacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

}
