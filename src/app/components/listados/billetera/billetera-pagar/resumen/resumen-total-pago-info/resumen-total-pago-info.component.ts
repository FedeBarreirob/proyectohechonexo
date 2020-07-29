import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-resumen-total-pago-info',
  templateUrl: './resumen-total-pago-info.component.html',
  styleUrls: ['./resumen-total-pago-info.component.css']
})
export class ResumenTotalPagoInfoComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
