import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-billetera-card-info',
  templateUrl: './billetera-card-info.component.html',
  styleUrls: ['./billetera-card-info.component.css']
})
export class BilleteraCardInfoComponent implements OnInit {

  @Input()
  saldoGlobal: SaldoGlobalCtaCteAplicada;

  constructor(private dialogRef: MatDialogRef<BilleteraCardInfoComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }
}
