import { Component, OnInit, Input } from '@angular/core';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';

@Component({
  selector: 'app-cuenta-corriente-item-movil',
  templateUrl: './cuenta-corriente-item-movil.component.html',
  styleUrls: ['./cuenta-corriente-item-movil.component.css']
})
export class CuentaCorrienteItemMovilComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCte;

  constructor() { }

  ngOnInit() {
  }

}
