import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-definicion-de-boletos-afijar-total',
  templateUrl: './definicion-de-boletos-afijar-total.component.html',
  styleUrls: ['./definicion-de-boletos-afijar-total.component.css']
})
export class DefinicionDeBoletosAFijarTotalComponent implements OnInit {

  @Input()
  totalMercaderiaACanjear$: BehaviorSubject<number>;

  @Input()
  stockAFijar: number;

  constructor() { }

  ngOnInit() {
  }

}
