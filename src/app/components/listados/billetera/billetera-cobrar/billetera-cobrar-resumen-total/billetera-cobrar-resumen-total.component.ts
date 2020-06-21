import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-billetera-cobrar-resumen-total',
  templateUrl: './billetera-cobrar-resumen-total.component.html',
  styleUrls: ['./billetera-cobrar-resumen-total.component.css']
})
export class BilleteraCobrarResumenTotalComponent implements OnInit {

  @Input()
  cobrosProgramados$: BehaviorSubject<any>;

  esCelular: boolean;

  total: number = 0;

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.cobrosProgramados$) {
      this.cobrosProgramados$.asObservable().subscribe(
        cobrosProgramados => {
          this.actualizarTotal(cobrosProgramados);
        }
      );

      this.actualizarTotal(this.cobrosProgramados$.getValue());
    }
  }

  /**
   * Sumar los importes ingresados
   */
  actualizarTotal(cobrosProgramados?: Array<any>) {
    if (cobrosProgramados && cobrosProgramados.length > 0) {
      this.total = cobrosProgramados
        .map(cobro => cobro.monto)
        .reduce((acum, current) => Number.parseFloat(acum) + Number.parseFloat(current), 0);
    } else {
      this.total = 0;
    }
  }
}
