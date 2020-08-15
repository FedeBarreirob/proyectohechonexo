import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-situacion-usuario',
  templateUrl: './situacion-usuario.component.html',
  styleUrls: ['./situacion-usuario.component.css']
})
export class SituacionUsuarioComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
