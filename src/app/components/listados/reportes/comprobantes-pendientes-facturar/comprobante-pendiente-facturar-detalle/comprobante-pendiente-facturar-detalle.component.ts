import { Component, OnInit, Input } from '@angular/core';
import { ComprobantePendienteFacturar } from '../../../../../interfaces/informacion-tributaria/comprobante-pendiente-facturar/comprobante-pendiente-facturar';

@Component({
  selector: 'app-comprobante-pendiente-facturar-detalle',
  templateUrl: './comprobante-pendiente-facturar-detalle.component.html',
  styleUrls: ['./comprobante-pendiente-facturar-detalle.component.css']
})
export class ComprobantePendienteFacturarDetalleComponent implements OnInit {

  @Input()
  comprobantePendienteFacturar: ComprobantePendienteFacturar;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
