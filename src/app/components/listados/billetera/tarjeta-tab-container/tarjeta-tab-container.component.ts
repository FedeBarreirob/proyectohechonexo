import { Component, OnInit, Input } from '@angular/core';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-tarjeta-tab-container',
  templateUrl: './tarjeta-tab-container.component.html',
  styleUrls: ['./tarjeta-tab-container.component.css']
})
export class TarjetaTabContainerComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;

  constructor() { }

  ngOnInit() {
    console.log(this.saldoGlobal);
  }

}
