import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cta-cte-filtro',
  templateUrl: './cta-cte-filtro.component.html',
  styleUrls: ['./cta-cte-filtro.component.css'],
  providers: [DatePipe]
})
export class CtaCteFiltroComponent implements OnInit {

  @Input()
  cuenta: any;

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  rubro: any;
  fechaDesde: string;
  fechaHasta: string;

  rubros: Array<any> = [
    {
      codigo: "granos",
      texto: "Granos",
      imagen: "assets/cta-cte-filtro/granos.png"
    },
    {
      codigo: "agroinsumos",
      texto: "Agroinsumos",
      imagen: "assets/cta-cte-filtro/agroinsumos.png"
    },
    {
      codigo: "balanceado",
      texto: "Balanceados",
      imagen: "assets/cta-cte-filtro/balanceado.png"
    },
    {
      codigo: "servicios",
      texto: "Servicios",
      imagen: "assets/cta-cte-filtro/servicios.png"
    }
  ];

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }

  // funcion que limpiar 
  limpiar() {
    this.rubro = "";
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
        rubro: this.rubro
      }

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }

    this.cerrar();
  }
}
