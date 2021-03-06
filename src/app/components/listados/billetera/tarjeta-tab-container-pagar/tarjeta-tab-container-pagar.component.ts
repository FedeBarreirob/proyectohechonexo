import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { MatDialog } from '@angular/material';
import { BilleteraCardInfoPagosComponent } from '../billetera-card-info-pagos/billetera-card-info-pagos.component';

@Component({
  selector: 'app-tarjeta-tab-container-pagar',
  templateUrl: './tarjeta-tab-container-pagar.component.html',
  styleUrls: ['./tarjeta-tab-container-pagar.component.css']
})
export class TarjetaTabContainerPagarComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  solicitarInfo(){
    let dialogRef = this.dialog.open(BilleteraCardInfoPagosComponent, {
      maxWidth: '90vw',
      width: '388px',
      maxHeight: '90vh',
      height: '523px'
    });
  }
}
