import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-billetera-liquidaciones-detalle-una-liquidacion',
  templateUrl: './billetera-liquidaciones-detalle-una-liquidacion.component.html',
  styleUrls: ['./billetera-liquidaciones-detalle-una-liquidacion.component.css']
})
export class BilleteraLiquidacionesDetalleUnaLiquidacionComponent implements OnInit {

  @Input()
  liquidacion: any;

  constructor() { }

  ngOnInit() {
  }

}
