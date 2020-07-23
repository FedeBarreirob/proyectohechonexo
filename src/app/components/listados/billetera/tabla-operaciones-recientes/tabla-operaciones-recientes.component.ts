import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-tabla-operaciones-recientes',
  templateUrl: './tabla-operaciones-recientes.component.html',
  styleUrls: ['./tabla-operaciones-recientes.component.css'],
})
export class TablaOperacionesRecientesComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
