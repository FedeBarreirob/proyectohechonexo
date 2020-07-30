import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-billetera-card-info-pagos',
  templateUrl: './billetera-card-info-pagos.component.html',
  styleUrls: ['./billetera-card-info-pagos.component.css']
})
export class BilleteraCardInfoPagosComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;

  constructor(private dialogRef: MatDialogRef<BilleteraCardInfoPagosComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }

}
