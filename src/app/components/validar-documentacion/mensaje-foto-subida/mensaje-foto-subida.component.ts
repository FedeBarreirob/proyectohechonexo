import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mensaje-foto-subida',
  templateUrl: './mensaje-foto-subida.component.html',
  styleUrls: ['./mensaje-foto-subida.component.css']
})
export class MensajeFotoSubidaComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MensajeFotoSubidaComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }
}
