import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-billetera-liquidaciones-detalle',
  templateUrl: './billetera-liquidaciones-detalle.component.html',
  styleUrls: ['./billetera-liquidaciones-detalle.component.css']
})
export class BilleteraLiquidacionesDetalleComponent implements OnInit {

  liquidaciones: Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private dialogRef: MatDialogRef<BilleteraLiquidacionesDetalleComponent>
  ) {
    this.liquidaciones = data;
  }

  ngOnInit() {
  }

  /**
   * Cierra este dialogo
   */
  cerrar() {
    this.dialogRef.close();
  }
}
