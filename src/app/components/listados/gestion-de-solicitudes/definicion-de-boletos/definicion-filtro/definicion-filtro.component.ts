import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-definicion-filtro',
  templateUrl: './definicion-filtro.component.html',
  styleUrls: ['./definicion-filtro.component.css']
})
export class DefinicionFiltroComponent implements OnInit {

  @Input()
  cuenta: any;

  @Input()
  observerFiltro$: BehaviorSubject<any>

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  metodoOptions = [
    {
      descripcion: "Planta",
      value: "Pl"
    },
    {
      descripcion: "Puerto",
      value: "Pu"
    }
  ];
  metodoSeleccionado: string;

  estadoOptions = [
    {
      descripcion: "1819",
      value: 1
    },
    {
      descripcion: "1920",
      value: 2
    },
    {
      descripcion: "2020",
      value: 3
    },
    {
      descripcion: "1918",
      value: 4
    }
  ];
  estadoSeleccionado: number;

  constructor() { }

  ngOnInit() {
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }

}
