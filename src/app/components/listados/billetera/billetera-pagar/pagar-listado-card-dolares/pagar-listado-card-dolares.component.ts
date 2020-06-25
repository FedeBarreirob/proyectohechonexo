import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PagoDolares } from '../../../../../models/security/pagodolares';

@Component({
  selector: 'app-pagar-listado-card-dolares',
  templateUrl: './pagar-listado-card-dolares.component.html',
  styleUrls: ['./pagar-listado-card-dolares.component.css']
})
export class PagarListadoCardDolaresComponent implements OnInit {

  esCelular: boolean;

  pagoDolaresArray: PagoDolares[] = [
    {id: 1, 'monto': 53000, 'fecha': new Date(), 'tipopago': 'Agroinsumos'},
    {id: 2, 'monto': 53000, 'fecha': new Date(), 'tipopago': 'Granos'}
  ];

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }
  
}
