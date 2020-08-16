import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-completar-registro-dialog',
  templateUrl: './completar-registro-dialog.component.html',
  styleUrls: ['./completar-registro-dialog.component.css']
})
export class CompletarRegistroDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CompletarRegistroDialogComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }

}
