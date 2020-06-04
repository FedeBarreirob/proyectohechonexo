import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-apagar-desktop',
  templateUrl: './billetera-apagar-desktop.component.html',
  styleUrls: ['./billetera-apagar-desktop.component.css']
})
export class BilleteraApagarDesktopComponent implements OnInit {

  esCelular = false;
  total = 1460000;

  constructor(
    private deviceService: DeviceDetectorService
    ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }
}
