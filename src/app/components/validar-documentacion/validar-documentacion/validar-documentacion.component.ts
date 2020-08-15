import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-validar-documentacion',
  templateUrl: './validar-documentacion.component.html',
  styleUrls: ['./validar-documentacion.component.css']
})
export class ValidarDocumentacionComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
