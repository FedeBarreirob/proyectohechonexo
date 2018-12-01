import { Component, OnInit, Inject } from '@angular/core';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PerfilesEdicionComponent } from '../perfiles-edicion/perfiles-edicion.component';

@Component({
  selector: 'app-perfil-operaciones',
  templateUrl: './perfil-operaciones.component.html',
  styleUrls: ['./perfil-operaciones.component.css']
})
export class PerfilOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PerfilBasico,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra el dialogo de edicion 
  verEditar() {
    this.dialog.open(PerfilesEdicionComponent, { data: this.data });
  }
}
