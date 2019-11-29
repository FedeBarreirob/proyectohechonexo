import { Component, OnInit, Input } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-cuenta-corriente-aplicada-item-movil',
  templateUrl: './cuenta-corriente-aplicada-item-movil.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-item-movil.component.css']
})
export class CuentaCorrienteAplicadaItemMovilComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCteAplicada;

  constructor() { }

  ngOnInit() {
  }

}
