import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatCheckboxModule } from '@angular/material';

@Component({
  selector: 'app-tutorial-modal',
  templateUrl: './tutorial-modal.component.html',
  styleUrls: ['./tutorial-modal.component.css']
})

export class TutorialModalComponent implements OnInit {

  title: string;
  description: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TutorialModalComponent,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
