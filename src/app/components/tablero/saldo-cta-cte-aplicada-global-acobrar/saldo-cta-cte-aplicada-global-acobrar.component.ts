import { Component, OnInit, Input } from '@angular/core';
import { SaldoGlobalCtaCteAplicada } from '../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-saldo-cta-cte-aplicada-global-acobrar',
  templateUrl: './saldo-cta-cte-aplicada-global-acobrar.component.html',
  styleUrls: ['./saldo-cta-cte-aplicada-global-acobrar.component.css']
})
export class SaldoCtaCteAplicadaGlobalACobrarComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;

  @Input()
  seObtuvoSaldoExito: boolean;

  constructor() { }

  ngOnInit() {
  }

}
