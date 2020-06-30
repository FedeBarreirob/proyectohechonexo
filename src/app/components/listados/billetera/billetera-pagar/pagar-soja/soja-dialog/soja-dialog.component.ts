import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-soja-dialog',
  templateUrl: './soja-dialog.component.html',
  styleUrls: ['./soja-dialog.component.css']
})
export class SojaDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SojaDialogComponent>) { }

  ngOnInit() {
  }

  salir(){
    this.dialogRef.close();
  }
}
