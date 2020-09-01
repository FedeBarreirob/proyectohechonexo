import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-info-perfil-limite-credito',
  templateUrl: './info-perfil-limite-credito.component.html',
  styleUrls: ['./info-perfil-limite-credito.component.css']
})
export class InfoPerfilLimiteCreditoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<InfoPerfilLimiteCreditoComponent>
    ) { }

  ngOnInit() {
  }

  salir() {
    this.dialogRef.close();
  }

}
