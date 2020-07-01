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

  @Input()
  totalImporteCanje$: BehaviorSubject<number>;

  esMontoInsuficiente: boolean;

  constructor() { }

  ngOnInit() {
    this.totalEvent$.subscribe(() => this.determinarSiElMontoDeCanjeEsSuficiente());
    this.totalImporteCanje$.subscribe(() => this.determinarSiElMontoDeCanjeEsSuficiente());
    this.determinarSiElMontoDeCanjeEsSuficiente();
  }

  /**
   * Verifica si el importe equivalente a la mercadería indicada, es suficiente para saldar el pago
   */
  determinarSiElMontoDeCanjeEsSuficiente() {
    if (this.totalEvent$ && this.totalImporteCanje$) {
      let total: number = this.totalEvent$.getValue();
      let totalImporteCanje: number = this.totalImporteCanje$.getValue();

      if (totalImporteCanje < total) {
        this.esMontoInsuficiente = true;
      } else {
        this.esMontoInsuficiente = false;
      }
    } else {
      this.esMontoInsuficiente = true;
    }
  }
}
