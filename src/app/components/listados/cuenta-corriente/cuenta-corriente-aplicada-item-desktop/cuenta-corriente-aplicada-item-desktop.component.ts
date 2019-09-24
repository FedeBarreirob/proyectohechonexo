import { Component, OnInit, Input } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Component({
  selector: 'app-cuenta-corriente-aplicada-item-desktop',
  templateUrl: './cuenta-corriente-aplicada-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-item-desktop.component.css']
})
export class CuentaCorrienteAplicadaItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCteAplicada;

  constructor() { }

  ngOnInit() {
  }

}
