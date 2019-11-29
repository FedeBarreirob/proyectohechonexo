import { Component, OnInit, Input } from '@angular/core';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';

@Component({
  selector: 'app-ventas-item-movil',
  templateUrl: './ventas-item-movil.component.html',
  styleUrls: ['./ventas-item-movil.component.css']
})
export class VentasItemMovilComponent implements OnInit {

  @Input()
  movimiento: FijacionVenta;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
