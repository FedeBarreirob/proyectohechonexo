import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoMercPendEntregar } from '../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';

@Component({
  selector: 'app-merc-pend-entregar-detalle',
  templateUrl: './merc-pend-entregar-detalle.component.html',
  styleUrls: ['./merc-pend-entregar-detalle.component.css']
})
export class MercPendEntregarDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoMercPendEntregar) { }

  ngOnInit() {
  }

}
