import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-operaciones-movil',
  templateUrl: './lista-operaciones-movil.component.html',
  styleUrls: ['./lista-operaciones-movil.component.css']
})
export class ListaOperacionesMovilComponent implements OnInit {

  cobros = [{
    'id': 1,
    'cobrosnum': '0001',
    'monto': '12.000'
  }, {
    'id': 2,
    'cobrosnum': '0002',
    'monto': '25.000'
  }, {
    'id': 3,
    'cobrosnum': '0003',
    'monto': '456.000'
  }
];

  constructor() {
  }

  ngOnInit() {
  }

}
