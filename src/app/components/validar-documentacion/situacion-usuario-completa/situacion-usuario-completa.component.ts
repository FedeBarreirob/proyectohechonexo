import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-situacion-usuario-completa',
  templateUrl: './situacion-usuario-completa.component.html',
  styleUrls: ['./situacion-usuario-completa.component.css']
})
export class SituacionUsuarioCompletaComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
