import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-inicio-registro-confirmacion-mail',
  templateUrl: './inicio-registro-confirmacion-mail.component.html',
  styleUrls: ['./inicio-registro-confirmacion-mail.component.css']
})
export class InicioRegistroConfirmacionMailComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
