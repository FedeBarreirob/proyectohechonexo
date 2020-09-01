import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-resumen-resumen',
  templateUrl: './resumen-resumen.component.html',
  styleUrls: ['./resumen-resumen.component.css']
})
export class ResumenResumenComponent implements OnInit {

  @Input()
  solicitudDePagoCreada: any;

  @Input()
  unidadMedida: string;

  @Input()
  total: number;

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
