import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-pagar-stock',
  templateUrl: './card-pagar-stock.component.html',
  styleUrls: ['./card-pagar-stock.component.css']
})
export class CardPagarStockComponent implements OnInit {

  stockFijar = [
    {'cantidadF': 1500, 'cantidadFDisponible': 23000}
  ];

  stockPesificar = [
    {'cantidadP': 1500, 'cantidadPDisponible': 23000}
  ];
  constructor() { }

  ngOnInit() {
  }

}
