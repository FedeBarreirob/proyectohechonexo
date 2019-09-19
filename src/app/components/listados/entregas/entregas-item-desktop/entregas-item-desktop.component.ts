import { Component, OnInit, Input } from '@angular/core';
import { MovimientoEntrega } from 'src/app/interfaces/entregas/listado-entregas';

@Component({
  selector: 'app-entregas-item-desktop',
  templateUrl: './entregas-item-desktop.component.html',
  styleUrls: ['./entregas-item-desktop.component.css']
})
export class EntregasItemDesktopComponent implements OnInit {

  @Input()
  movimiento: MovimientoEntrega;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
