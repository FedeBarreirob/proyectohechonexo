import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BilleteraService, DetalleCuenta } from '../../../../../services/billetera/billetera.service';

@Component({
  selector: 'app-billetera-cobrar-card',
  templateUrl: './billetera-cobrar-card.component.html',
  styleUrls: ['./billetera-cobrar-card.component.css']
})
export class BilleteraCobrarCardComponent implements OnInit {

  esCelular = false;
  total = 123000;

  detalleCuenta: DetalleCuenta[] = [];

  constructor(
    private deviceService: DeviceDetectorService,
    private billeteraService: BilleteraService
    ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.detalleCuenta = this.billeteraService.getDetalle();

  }

  get details(): Array<any> {
    return this.detalleCuenta;
  }

}
