import { Component, OnInit, Input } from '@angular/core';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';

@Component({
  selector: 'app-cuenta-corriente-item-desktop',
  templateUrl: './cuenta-corriente-item-desktop.component.html',
  styleUrls: ['./cuenta-corriente-item-desktop.component.css']
})
export class CuentaCorrienteItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoCtaCte;

  constructor() { }

  ngOnInit() {
  }

}
