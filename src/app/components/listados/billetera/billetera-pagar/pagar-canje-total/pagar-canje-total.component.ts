import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagar-canje-total',
  templateUrl: './pagar-canje-total.component.html',
  styleUrls: ['./pagar-canje-total.component.css']
})
export class PagarCanjeTotalComponent implements OnInit {
  @Input()
  totalEvent$: BehaviorSubject<number>;
  
  totalCanje = [
    {'monto': '232,000'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
