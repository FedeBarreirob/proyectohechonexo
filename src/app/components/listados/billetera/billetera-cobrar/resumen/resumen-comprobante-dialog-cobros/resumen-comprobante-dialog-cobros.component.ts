import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-resumen-comprobante-dialog',
  templateUrl: './resumen-comprobante-dialog.component.html',
  styleUrls: ['./resumen-comprobante-dialog.component.css']
})
export class ResumenComprobanteDialogCobrosComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResumenComprobanteDialogCobrosComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }

}
