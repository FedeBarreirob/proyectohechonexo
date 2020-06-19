import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { cobro } from '../../../../../models/security/cobro';
import { cuentas } from '../../../../../models/security/cuentas';


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

  cobrosArray: cobro[] = [
    {id: 1, 'fecha': new Date(), 'monto': '12,000', 'montototal': '123,000'},
  ];

  selectedCobros: cobro = new cobro();

  cuentasArray: cuentas[] = [
    {'id': 1, 'nombre': 'José Gaviglio', 'cbu': 123456789, 'ref': 'José'},
    {'id': 1, 'nombre': 'Pedro Oliveira', 'cbu': 123466789, 'ref': 'Pedro'}
  ];

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
    this.cobrosArray = this.cobrosArray.filter(x => x != this.selectedCobros);
    this.selectedCobros = new cobro();
  }

  AgregarCobro(){
    this.selectedCobros.id = this.selectedCobros.id + 1;
    this.selectedCobros.monto = '13,000'; //ejemplo prueba
    this.selectedCobros.montototal = '123,000'; //ejemplo prueba
    this.cobrosArray.push(this.selectedCobros);
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
