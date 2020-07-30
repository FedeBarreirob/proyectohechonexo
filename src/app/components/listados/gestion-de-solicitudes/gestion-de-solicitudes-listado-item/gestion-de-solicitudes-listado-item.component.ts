import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-gestion-de-solicitudes-listado-item',
  templateUrl: './gestion-de-solicitudes-listado-item.component.html',
  styleUrls: ['./gestion-de-solicitudes-listado-item.component.css']
})
export class GestionDeSolicitudesListadoItemComponent implements OnInit {

  @Input()
  solicitud: any;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  get urlAvatar(): string {
    if (this.solicitud && this.solicitud.perfilBasicoInfoPersonalDTO && this.solicitud.perfilBasicoInfoPersonalDTO.avatar && this.solicitud.perfilBasicoInfoPersonalDTO.avatar !== "") {
      return this.solicitud.perfilBasicoInfoPersonalDTO.avatar;
    } else {
      return "assets/perfil/sin-foto.jpg";
    }
  }
}
