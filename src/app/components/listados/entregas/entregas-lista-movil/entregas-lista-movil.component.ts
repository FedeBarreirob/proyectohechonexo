import { Component, OnInit, Input } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-lista-movil',
  templateUrl: './entregas-lista-movil.component.html',
  styleUrls: ['./entregas-lista-movil.component.css']
})
export class EntregasListaMovilComponent implements OnInit {

  @Input()
  listadoEntregas: Array<MovimientoEntrega>;

  constructor() { }

  ngOnInit() {
  }

}
