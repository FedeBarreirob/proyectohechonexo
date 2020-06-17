import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-cobrar-list',
  templateUrl: './billetera-cobrar-list.component.html',
  styleUrls: ['./billetera-cobrar-list.component.css']
})
export class BilleteraCobrarListComponent implements OnInit {

  cobros = [{
    'id': 1,
    'fecha': '23/12/20',
    'monto': '123,000'
  }, {
    'id': 2,
    'fecha': '27/12/20',
    'monto': '124,000'
  }, {
    'id': 3,
    'fecha': '31/12/20',
    'monto': '125,000'
  }];

  esCelular = false;

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
