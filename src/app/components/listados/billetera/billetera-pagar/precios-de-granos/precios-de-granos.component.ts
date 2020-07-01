import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { EntregasService } from '../../../../../services/entregas/entregas.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-precios-de-granos',
  templateUrl: './precios-de-granos.component.html',
  styleUrls: ['./precios-de-granos.component.css']
})
export class PreciosDeGranosComponent implements OnInit, OnDestroy {

  especies: Array<string>;
  unidadMedida: string;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  PESOS: string = 'P';
  BOLSA_DE_ROSARIO: string = 'BPR';
  precios: Array<any>;
  fecha: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PreciosDeGranosComponent>,
    private entregasService: EntregasService
  ) {
    this.especies = data.especies;
    this.unidadMedida = data.unidadMedida;
  }

  ngOnInit() {
    this.cargarPrecioEspecie();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  salir() {
    this.dialogRef.close();
  }

  /**
   * Carga el precio de la especie registrado en algoritmo 
   * para usarlo como referencia en los calculos
   */
  cargarPrecioEspecie() {
    if (this.cargando == false) {
      this.cargando = true;

      let monedas = [this.PESOS];

      this.entregasService.mercadoDeGranoPrecios(this.especies, monedas, this.BOLSA_DE_ROSARIO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.precios = respuesta.datos;
              this.fecha = this.precios[0].fecha;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );
    }
  }
}
