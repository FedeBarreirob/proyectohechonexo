import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-seleccionados-modal',
  templateUrl: './seleccionados-modal.component.html',
  styleUrls: ['./seleccionados-modal.component.css']
})

export class SeleccionadosModalComponent implements OnInit {

  comprobantesSeleccionados: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SeleccionadosModalComponent,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
