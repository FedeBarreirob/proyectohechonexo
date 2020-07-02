import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagar-filtro',
  templateUrl: './pagar-filtro.component.html',
  styleUrls: ['./pagar-filtro.component.css']
})
export class PagarFiltroComponent implements OnInit {

  @Input()
  cuenta: any;

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  monedasOptions = [
    {
      descripcion: "Pesos (ARS)",
      value: "P"
    },
    {
      descripcion: "Dólares (USD)",
      value: "D"
    }
  ];
  monedaSeleccionada: string;

  vencimientoOptions = [
    {
      descripcion: "Vencido",
      value: 1
    },
    {
      descripcion: "Por vencer",
      value: 2
    }
  ];
  vencimientoSeleccionado: number;

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
      texto: "Nutrición Animal",
      imagen: "assets/cta-cte-filtro/balanceado.png"
    },
    {
      codigo: "servicios",
      texto: "Servicios",
      imagen: "assets/cta-cte-filtro/servicios.png"
    }
  ];
  rubro: any;

  constructor() { }

  ngOnInit() {
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }

  // funcion que limpiar 
  limpiar() {
    this.rubro = "";
    this.vencimientoSeleccionado = null;
    this.monedaSeleccionada = null;
  }

  // funcion que arma un filtro y lo notifica al llamador 
  aplicar() {
    if (this.cuenta && this.cuenta.id && this.cuenta.id.codigo && this.observerFiltro$) {

      let filtro: any = {
        cuenta: this.cuenta.id.codigo,
        aPagar: true
      }

      filtro = this.filtroConFiltroRubros(filtro);

      if (this.vencimientoSeleccionado) {
        if (this.vencimientoSeleccionado === 1) {
          filtro.vencido = true;
        } else {
          filtro.AVencer = true;
        }
      }

      if (this.monedaSeleccionada) {
        filtro.moneda = this.monedaSeleccionada
      }

      this.observerFiltro$.next(filtro);
    } else {
      this.observerFiltro$.next(null);
    }

    this.cerrar();
  }

  /**
   * Agrega filtros según rubros
   * @param filtro Filtro sin rubros
   */
  filtroConFiltroRubros(filtro: any): any {

    let filtroConRubros = filtro;

    switch (this.rubro) {
      case "granos":
        filtroConRubros.granos = true;
        break;

      case "agroinsumos":
        filtroConRubros.agroinsumos = true;
        break;

      case "balanceado":
        filtroConRubros.nutricionAnimal = true;
        break;

      case "servicios":
        filtroConRubros.servicios = true;
        break;
    }

    return filtroConRubros;
  }
}
