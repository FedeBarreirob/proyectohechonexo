import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inicio-filtro',
  templateUrl: './inicio-filtro.component.html',
  styleUrls: ['./inicio-filtro.component.css']
})
export class InicioFiltroComponent implements OnInit {

  @Input()
  cuenta: any;

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  metodoOptions = [
    {
      descripcion: "Fijación",
      value: "F"
    },
    {
      descripcion: "Pesificación",
      value: "P"
    }
  ];
  metodoSeleccionado: string;

  estadoOptions = [
    {
      descripcion: "Pendientes",
      value: 1
    },
    {
      descripcion: "Finalizadas",
      value: 2
    }
  ];
  estadoSeleccionado: number;

  rubros: Array<any> = [
    {
      codigo: "soja",
      texto: "Soja",
      imagen: "assets/cereal-filtro/soja.png"
    },
    {
      codigo: "maiz",
      texto: "Maíz",
      imagen: "assets/cereal-filtro/maiz.png"
    },
    {
      codigo: "trigo",
      texto: "Trigo",
      imagen: "assets/cereal-filtro/trigo.png"
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

}
