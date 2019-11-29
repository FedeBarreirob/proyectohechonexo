import { Component, OnInit, Input } from '@angular/core';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-item-movil',
  templateUrl: './entregas-item-movil.component.html',
  styleUrls: ['./entregas-item-movil.component.css']
})
export class EntregasItemMovilComponent implements OnInit {

  @Input()
  movimiento: MovimientoEntrega;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
