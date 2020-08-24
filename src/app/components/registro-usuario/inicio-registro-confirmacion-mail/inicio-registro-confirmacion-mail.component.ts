import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-registro-confirmacion-mail',
  templateUrl: './inicio-registro-confirmacion-mail.component.html',
  styleUrls: ['./inicio-registro-confirmacion-mail.component.css']
})
export class InicioRegistroConfirmacionMailComponent implements OnInit {

  esCelular: boolean;
  mail: string;

  constructor(
    private deviceService: DeviceDetectorService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.activatedRouter.params.subscribe(params => {
      if (params.mail) {
        this.mail = params.mail;
      } else {
        this.mail = null;
      }
    });
  }

}
