import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PagoPesos } from '../../../../../models/security/pagopesos';

@Component({
  selector: 'app-pagar-listado-card-pesos',
  templateUrl: './pagar-listado-card-pesos.component.html',
  styleUrls: ['./pagar-listado-card-pesos.component.css']
})
export class PagarListadoCardPesosComponent implements OnInit {

  esCelular: boolean;

  pagoPesosArray: PagoPesos[] = [
    {id: 1, 'monto': 53000, 'fecha': new Date(), 'tipopago': 'Agroinsumos'},
    {id: 2, 'monto': 53000, 'fecha': new Date(), 'tipopago': 'Granos'}
  ];

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
