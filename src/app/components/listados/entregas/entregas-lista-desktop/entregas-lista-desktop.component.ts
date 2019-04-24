import { Component, OnInit, Input } from '@angular/core';
import { MovimientoEntregaAgrupadoPorCampo } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-lista-desktop',
  templateUrl: './entregas-lista-desktop.component.html',
  styleUrls: ['./entregas-lista-desktop.component.css']
})
export class EntregasListaDesktopComponent implements OnInit {

  @Input()
  listadoEntregasAgrupadasPorCampo: Array<MovimientoEntregaAgrupadoPorCampo>;

  cargando: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
