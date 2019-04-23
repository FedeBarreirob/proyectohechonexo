import { Component, OnInit, Input } from '@angular/core';
import { FiltroEspecieCosecha } from '../../../interfaces/varios/filtro-especie-cosecha';

@Component({
  selector: 'app-cereales-filtro',
  templateUrl: './cereales-filtro.component.html',
  styleUrls: ['./cereales-filtro.component.css']
})
export class CerealesFiltroComponent implements OnInit {

  @Input()
  filtrosEspecieCosecha: FiltroEspecieCosecha;

  constructor() { }

  ngOnInit() {
  }

}
