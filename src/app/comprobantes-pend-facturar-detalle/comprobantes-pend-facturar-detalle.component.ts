import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoComprobantesPendFact } from '../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';

@Component({
  selector: 'app-comprobantes-pend-facturar-detalle',
  templateUrl: './comprobantes-pend-facturar-detalle.component.html',
  styleUrls: ['./comprobantes-pend-facturar-detalle.component.css']
})
export class ComprobantesPendFacturarDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovimientoComprobantesPendFact) { }

  ngOnInit() {
  }

}
