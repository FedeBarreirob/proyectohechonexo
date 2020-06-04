import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-billetera-operaciones-item',
  templateUrl: './billetera-operaciones-item.component.html',
  styleUrls: ['./billetera-operaciones-item.component.css']
})
export class BilleteraOperacionesItemComponent implements OnInit {

  @Input()
  operacion: any;

  constructor() { }

  ngOnInit() {
  }

}
