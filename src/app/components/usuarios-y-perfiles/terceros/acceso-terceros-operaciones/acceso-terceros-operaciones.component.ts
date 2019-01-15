import { Component, OnInit, Inject } from '@angular/core';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AccesoTercerosEdicionComponent } from '../acceso-terceros-edicion/acceso-terceros-edicion.component';

@Component({
  selector: 'app-acceso-terceros-operaciones',
  templateUrl: './acceso-terceros-operaciones.component.html',
  styleUrls: ['./acceso-terceros-operaciones.component.css']
})
export class AccesoTercerosOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TerceroBasico,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra el dialogo de edicion 
  verEditar() {
    console.log(this.data);
    this.dialog.open(AccesoTercerosEdicionComponent, { data: this.data });
  }
}
