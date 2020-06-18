import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-billetera-cobrar-cuenta',
  templateUrl: './billetera-cobrar-cuenta.component.html',
  styleUrls: ['./billetera-cobrar-cuenta.component.css']
})
export class BilleteraCobrarCuentaComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
