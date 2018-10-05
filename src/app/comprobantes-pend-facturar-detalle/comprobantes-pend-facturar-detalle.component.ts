import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MovimientoComprobantesPendFact } from '../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { ComprobantesPendFacturarDetalleMasOperacionesComponent } from '../comprobantes-pend-facturar-detalle-mas-operaciones/comprobantes-pend-facturar-detalle-mas-operaciones.component';

@Component({
  selector: 'app-comprobantes-pend-facturar-detalle',
  templateUrl: './comprobantes-pend-facturar-detalle.component.html',
  styleUrls: ['./comprobantes-pend-facturar-detalle.component.css']
})
export class ComprobantesPendFacturarDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoComprobantesPendFact,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(ComprobantesPendFacturarDetalleMasOperacionesComponent, {
      data: this.data
    });
  }
}
