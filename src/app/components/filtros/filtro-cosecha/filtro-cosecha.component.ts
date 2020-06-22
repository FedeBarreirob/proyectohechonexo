import { Component, OnInit, Inject } from '@angular/core';
import { FiltroEspecieCosecha } from '../../../interfaces/varios/filtro-especie-cosecha';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-filtro-cosecha',
  templateUrl: './filtro-cosecha.component.html',
  styleUrls: ['./filtro-cosecha.component.css']
})
export class FiltroCosechaComponent implements OnInit {

  cosecha: string = "";
  filtrosEspecieCosecha: FiltroEspecieCosecha;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FiltroEspecieCosecha,
    private dialogRef: MatDialogRef<FiltroCosechaComponent>
  ) {
    this.filtrosEspecieCosecha = data;
  }

  ngOnInit() {
  }

  // funcion que limpiar 
  limpiar() {
    this.cosecha = "";
  }

  // funcion que arma un filtro y lo notifica al llamador 
  aplicar() {
    this.dialogRef.close(this.cosecha);
  }

  /**
   * Función que cierra el modal
   */
  cerrar() {
    this.dialogRef.close(null);
  }
}
