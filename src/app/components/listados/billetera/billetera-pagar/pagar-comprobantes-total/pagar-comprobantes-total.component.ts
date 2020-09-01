import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagar-comprobantes-total',
  templateUrl: './pagar-comprobantes-total.component.html',
  styleUrls: ['./pagar-comprobantes-total.component.css']
})
export class PagarComprobantesTotalComponent implements OnInit {

  @Input()
  totalEvent$: BehaviorSubject<number>;
  
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
