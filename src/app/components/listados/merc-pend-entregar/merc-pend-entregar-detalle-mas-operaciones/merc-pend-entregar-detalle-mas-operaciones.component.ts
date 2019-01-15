import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoMercPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { MercPendEntregarExportacionesService } from '../../../../services/merc-pend-entregar/merc-pend-entregar-exportaciones.service';

@Component({
  selector: 'app-merc-pend-entregar-detalle-mas-operaciones',
  templateUrl: './merc-pend-entregar-detalle-mas-operaciones.component.html',
  styleUrls: ['./merc-pend-entregar-detalle-mas-operaciones.component.css']
})
export class MercPendEntregarDetalleMasOperacionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovimientoMercPendEntregar,
    private exportadorService: MercPendEntregarExportacionesService
  ) { }

  ngOnInit() {
  }

  // funcion encargada de exportar a excel
  exportarAExcel() {
    this.exportadorService.exportarMercPendEntregarDetalleExcel(this.data);
  }

  // funcion encargada de exportar a pdf
  exportarAPDF() {
    this.exportadorService.exportarMercPendEntregarDetallePDF(this.data);
  }
}
