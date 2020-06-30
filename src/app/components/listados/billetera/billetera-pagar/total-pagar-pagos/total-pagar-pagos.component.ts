import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-total-pagar-pagos',
  templateUrl: './total-pagar-pagos.component.html',
  styleUrls: ['./total-pagar-pagos.component.css']
})
export class TotalPagarPagosComponent implements OnInit {

  @Input()
  totalEvent$: BehaviorSubject<number>;

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
