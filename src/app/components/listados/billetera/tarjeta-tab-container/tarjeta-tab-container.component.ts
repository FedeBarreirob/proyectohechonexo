import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { MatDialog } from '@angular/material';
import { BilleteraCardInfoComponent } from '../billetera-card-info/billetera-card-info.component';

@Component({
  selector: 'app-tarjeta-tab-container',
  templateUrl: './tarjeta-tab-container.component.html',
  styleUrls: ['./tarjeta-tab-container.component.css']
})
export class TarjetaTabContainerComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  solicitarInfo(){
    let dialogRef = this.dialog.open(BilleteraCardInfoComponent, {
      maxWidth: '90vw',
      width: '388px',
      maxHeight: '90vh',
      height: '513px'
    });
  }
}
