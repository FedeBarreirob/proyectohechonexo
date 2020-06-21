import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-cobrar-resumen-total',
  templateUrl: './billetera-cobrar-resumen-total.component.html',
  styleUrls: ['./billetera-cobrar-resumen-total.component.css']
})
export class BilleteraCobrarResumenTotalComponent implements OnInit {

  esCelular: boolean;

  total = [
    {'monto': '12,000'}
  ];

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }
}
