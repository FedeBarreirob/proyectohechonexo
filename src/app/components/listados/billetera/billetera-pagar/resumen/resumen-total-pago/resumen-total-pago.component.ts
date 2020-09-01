import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resumen-total-pago',
  templateUrl: './resumen-total-pago.component.html',
  styleUrls: ['./resumen-total-pago.component.css']
})
export class ResumenTotalPagoComponent implements OnInit {

  @Input()
  totalEvent$: BehaviorSubject<number>;

  constructor() { }

  ngOnInit() {
  }

}
