import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pago-con-canje-disponible',
  templateUrl: './pago-con-canje-disponible.component.html',
  styleUrls: ['./pago-con-canje-disponible.component.css']
})
export class PagoConCanjeDisponibleComponent implements OnInit {

  @Input()
  disponible: any;

  constructor() { }

  ngOnInit() {
    console.log(this.disponible);
  }

}
