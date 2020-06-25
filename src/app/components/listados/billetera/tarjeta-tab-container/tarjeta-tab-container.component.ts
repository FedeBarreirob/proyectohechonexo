import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-tarjeta-tab-container',
  templateUrl: './tarjeta-tab-container.component.html',
  styleUrls: ['./tarjeta-tab-container.component.css']
})
export class TarjetaTabContainerComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
