import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mensaje-bienvenida-dialog',
  templateUrl: './mensaje-bienvenida-dialog.component.html',
  styleUrls: ['./mensaje-bienvenida-dialog.component.css']
})
export class MensajeBienvenidaDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MensajeBienvenidaDialogComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }
}
