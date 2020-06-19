import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-cobrar-card-total',
  templateUrl: './billetera-cobrar-card-total.component.html',
  styleUrls: ['./billetera-cobrar-card-total.component.css']
})
export class BilleteraCobrarCardTotalComponent implements OnInit {

  esCelular: boolean;

  cobros = [{
    'monto': '12,000'
  },];

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
