import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pagar-filtro',
  templateUrl: './pagar-filtro.component.html',
  styleUrls: ['./pagar-filtro.component.css']
})
export class PagarFiltroComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
