import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-cobrar-resumen',
  templateUrl: './billetera-cobrar-resumen.component.html',
  styleUrls: ['./billetera-cobrar-resumen.component.css']
})
export class BilleteraCobrarResumenComponent implements OnInit {

  esCelular: boolean;

  resumenArray = [
    {'id':1, 'monto': '12,000', 'fecha': '23/12/2020', 'modoCobro': 'Transferencia', 'nombre': 'José Gaviglio'}
  ];

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
