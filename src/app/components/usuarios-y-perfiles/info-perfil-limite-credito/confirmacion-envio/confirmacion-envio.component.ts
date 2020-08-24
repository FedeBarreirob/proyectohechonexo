import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion-envio',
  templateUrl: './confirmacion-envio.component.html',
  styleUrls: ['./confirmacion-envio.component.css']
})
export class ConfirmacionEnvioComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmacionEnvioComponent>) { }

  ngOnInit() {
  }

  salir() {
    this.dialogRef.close();
  }

}
