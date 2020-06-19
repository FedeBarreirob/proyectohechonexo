import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { cuentas } from '../../../../../models/security/cuentas';


@Component({
  selector: 'app-billetera-cobrar-cuenta',
  templateUrl: './billetera-cobrar-cuenta.component.html',
  styleUrls: ['./billetera-cobrar-cuenta.component.css']
})
export class BilleteraCobrarCuentaComponent implements OnInit {

  esCelular: boolean;

  cuentasArray: cuentas[] = [];

  selectedCuentas: cuentas = new cuentas();

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  AgregarCuenta(){
    this.selectedCuentas.id = this.selectedCuentas.id + 1;
    this.cuentasArray.push(this.selectedCuentas);

    this.selectedCuentas = new cuentas();
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
