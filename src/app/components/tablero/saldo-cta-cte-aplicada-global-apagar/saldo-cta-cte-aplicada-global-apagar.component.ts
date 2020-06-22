import { Component, OnInit, Input } from '@angular/core';
import { SaldoGlobalCtaCteAplicada } from '../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-saldo-cta-cte-aplicada-global-apagar',
  templateUrl: './saldo-cta-cte-aplicada-global-apagar.component.html',
  styleUrls: ['./saldo-cta-cte-aplicada-global-apagar.component.css']
})
export class SaldoCtaCteAplicadaGlobalAPagarComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;

  @Input()
  seObtuvoSaldoExito: boolean;

  constructor() { }

  ngOnInit() {
  }

}
