import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-billetera-acobrar-resumen-item',
  templateUrl: './billetera-acobrar-resumen-item.component.html',
  styleUrls: ['./billetera-acobrar-resumen-item.component.css']
})
export class BilleteraAcobrarResumenItemComponent implements OnInit {

  @Input()
  detail: any;

  constructor() { }

  ngOnInit() {
  }

}
