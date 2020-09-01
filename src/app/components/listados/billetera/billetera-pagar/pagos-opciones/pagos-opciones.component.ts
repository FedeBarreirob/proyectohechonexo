import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pagos-opciones',
  templateUrl: './pagos-opciones.component.html',
  styleUrls: ['./pagos-opciones.component.css']
})
export class PagosOpcionesComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }


}
