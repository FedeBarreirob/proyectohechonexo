import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-billetera-cobrar-card-cobro',
  templateUrl: './billetera-cobrar-card-cobro.component.html',
  styleUrls: ['./billetera-cobrar-card-cobro.component.css']
})
export class BilleteraCobrarCardCobroComponent implements OnInit {

  esCelular: boolean;
  isTransferencia: boolean = true;
  isChequeFisico: boolean = true;
  isCard: boolean = true;
  labelPosition: 'before' | 'after' = 'after';

  cobros = [{
    'id': 1,
    'fecha': '23/12/20',
    'monto': '12,000',
    'montototal': '123,000',
  },];

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  Transferencia(){
    this.isTransferencia = !this.isTransferencia;
  }

  chequeFisico(){
    this.isChequeFisico = !this.isChequeFisico;
  }

  cerrarVentana(){
    this.isCard = !this.isCard;
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
