import { Component, OnInit, Input } from '@angular/core';
import { InsumoPendiente } from '../../../../../interfaces/informacion-tributaria/insumo-pendiente/insumo-pendiente';

@Component({
  selector: 'app-insumo-pendiente-detalle',
  templateUrl: './insumo-pendiente-detalle.component.html',
  styleUrls: ['./insumo-pendiente-detalle.component.css']
})
export class InsumoPendienteDetalleComponent implements OnInit {

  @Input()
  insumoPendiente: InsumoPendiente;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {

  }

}
