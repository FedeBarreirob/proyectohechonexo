import { Component, OnInit, Input } from '@angular/core';
import { FijacionVenta } from '../../../../interfaces/ventas/fijacion-venta';

@Component({
  selector: 'app-ventas-item-desktop',
  templateUrl: './ventas-item-desktop.component.html',
  styleUrls: ['./ventas-item-desktop.component.css']
})
export class VentasItemDesktopComponent implements OnInit {

  @Input()
  movimiento: FijacionVenta;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
