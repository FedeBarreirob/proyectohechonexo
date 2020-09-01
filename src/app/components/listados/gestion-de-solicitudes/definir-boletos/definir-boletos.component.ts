import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-definir-boletos',
  templateUrl: './definir-boletos.component.html',
  styleUrls: ['./definir-boletos.component.css']
})
export class DefinirBoletosComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
