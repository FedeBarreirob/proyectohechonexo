import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-resumen-resumen-cobros',
  templateUrl: './resumen-resumen-cobros.component.html',
  styleUrls: ['./resumen-resumen-cobros.component.css']
})
export class ResumenResumenCobrosComponent implements OnInit {

  @Input()
  cobrosProgramados: Array<any>;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  get total(): number {
    if (this.cobrosProgramados && this.cobrosProgramados.length > 0) {
      return this.cobrosProgramados
        .map(cobro => cobro.monto)
        .reduce((acum: number, current: number) => acum + current);
    } else {
      return 0;
    }
  }
}
