import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BilleteraService, DetalleCuenta } from '../../../../services/billetera/billetera.service';

@Component({
  selector: 'app-billetera-acobrar-desktop',
  templateUrl: './billetera-acobrar-desktop.component.html',
  styleUrls: ['./billetera-acobrar-desktop.component.css']
})
export class BilleteraAcobrarDesktopComponent implements OnInit {

  esCelular = false;
  total = 1900000;

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
