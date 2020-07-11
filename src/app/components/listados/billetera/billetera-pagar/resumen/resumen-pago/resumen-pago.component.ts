import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { MovimientoCtaCteAplicada } from '../../../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.css']
})
export class ResumenPagoComponent implements OnInit {

  @Input()
  conceptosAPagarSeleccionados$: BehaviorSubject<Array<MovimientoCtaCteAplicada>>;

  @Input()
  disponiblesSeleccionados$: BehaviorSubject<Array<any>>;

  @Input()
  totalEvent$: BehaviorSubject<number>;

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
