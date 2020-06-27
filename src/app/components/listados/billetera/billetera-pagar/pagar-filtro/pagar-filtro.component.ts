import { Component, OnInit, Input, Output } from '@angular/core';
import { FiltroEspecieCosecha } from '../../../../../interfaces/varios/filtro-especie-cosecha';
import { EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pagar-filtro',
  templateUrl: './pagar-filtro.component.html',
  styleUrls: ['./pagar-filtro.component.css'],
  providers: [DatePipe]
})
export class PagarFiltroComponent implements OnInit {

  @Input()
  filtrosEspecieCosecha: FiltroEspecieCosecha;

  @Input()
  cuenta: any;

  @Input()
  sePuedeFiltrarEspecieCosecha: boolean = true;

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  public especie: string = "";
  public cosecha: string = "";
  public fechaDesde: string;
  public fechaHasta: string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }

  // funcion que limpiar 
  limpiar() {
    this.especie = "";
    this.cosecha = "";
    this.fechaDesde = "";
    this.fechaHasta = "";
  }

  // funcion que arma un filtro y lo notifica al llamador 
  aplicar() {
    if (this.cuenta && this.cuenta.id && this.cuenta.id.codigo) {

      let fechaDesdeFiltro = (this.fechaDesde) ? this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy') : null;
      let fechaHastaFiltro = (this.fechaHasta) ? this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy') : null;

      let filtro = {
        cuenta: this.cuenta.id.codigo,
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro,
        especie: this.especie,
        cosecha: this.cosecha
      }

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }

    this.cerrar();
  }
}
