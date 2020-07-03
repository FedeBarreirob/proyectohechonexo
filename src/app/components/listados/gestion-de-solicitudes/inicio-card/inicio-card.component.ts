import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-card',
  templateUrl: './inicio-card.component.html',
  styleUrls: ['./inicio-card.component.css']
})
export class InicioCardComponent implements OnInit {

  infoPerfil = [
    {'monto': '123,000', 'nombre': 'Alverto Cattelan', 'metodo': 'Canje'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
