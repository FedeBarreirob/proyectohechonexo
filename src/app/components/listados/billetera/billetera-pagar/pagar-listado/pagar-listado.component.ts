import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pagar-listado',
  templateUrl: './pagar-listado.component.html',
  styleUrls: ['./pagar-listado.component.css']
})
export class PagarListadoComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
