import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-pagar',
  templateUrl: './billetera-pagar.component.html',
  styleUrls: ['./billetera-pagar.component.css']
})
export class BilleteraPagarComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
