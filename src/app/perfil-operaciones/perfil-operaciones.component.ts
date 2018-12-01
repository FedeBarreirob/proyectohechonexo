import { Component, OnInit, Inject } from '@angular/core';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-perfil-operaciones',
  templateUrl: './perfil-operaciones.component.html',
  styleUrls: ['./perfil-operaciones.component.css']
})
export class PerfilOperacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PerfilBasico) { }

  ngOnInit() {
  }

}
