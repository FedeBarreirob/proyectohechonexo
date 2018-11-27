import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PerfilesEdicionComponent } from '../perfiles-edicion/perfiles-edicion.component';

@Component({
  selector: 'app-perfiles-listado',
  templateUrl: './perfiles-listado.component.html',
  styleUrls: ['./perfiles-listado.component.css']
})
export class PerfilesListadoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  nuevoPerfil() {
    this.dialog.open(PerfilesEdicionComponent, { panelClass: 'mat-dialog-container' });
  }
}
