import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pagar-canje-info',
  templateUrl: './pagar-canje-info.component.html',
  styleUrls: ['./pagar-canje-info.component.css']
})
export class PagarCanjeInfoComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
