import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-billetera-cobrar-card-total',
  templateUrl: './billetera-cobrar-card-total.component.html',
  styleUrls: ['./billetera-cobrar-card-total.component.css']
})
export class BilleteraCobrarCardTotalComponent implements OnInit {

  @Input()
  actualizarTotal$: Subject<any>;

  total: number = 0;

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.actualizarTotal$) {
      this.actualizarTotal$.subscribe(cobrosProgramados => this.actualizarTotal(cobrosProgramados));
    }

    this.actualizarTotal(null);
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
