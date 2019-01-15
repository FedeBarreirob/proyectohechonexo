import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoMercPendEntregar, MercPendEntregarTotales } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { MercPendEntregarExportacionesService } from '../../../../services/merc-pend-entregar/merc-pend-entregar-exportaciones.service';

@Component({
  selector: 'app-merc-pend-entregar-mas-operaciones',
  templateUrl: './merc-pend-entregar-mas-operaciones.component.html',
  styleUrls: ['./merc-pend-entregar-mas-operaciones.component.css']
})
export class MercPendEntregarMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exportacionesService: MercPendEntregarExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar el listado a excel
  exportarAExcel() {
    let movimientos: Array<MovimientoMercPendEntregar> = this.data.movimientos;
    this.exportacionesService.exportarListadoMercPendEntregarDetalleExcel(movimientos);
  }

  // funcion encargada de exportar el listado a pdf
  exportarAPDF() {
    let movimientos: Array<MovimientoMercPendEntregar> = this.data.movimientos;
    let totales: MercPendEntregarTotales = this.data.totales;
    this.exportacionesService.exportarListadoMercPendEntregarDetallePDF(movimientos, totales);
  }
}
