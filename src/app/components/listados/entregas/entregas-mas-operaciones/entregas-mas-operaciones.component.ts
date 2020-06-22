import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MovimientoEntrega, EntregasTotales } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasExportacionesService } from '../../../../services/entregas/entregas-exportaciones.service';

@Component({
    selector: 'app-entregas-mas-operaciones',
    templateUrl: './entregas-mas-operaciones.component.html',
    styleUrls: ['./entregas-mas-operaciones.component.css']
})
export class EntregasMasOperacionesComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private exportacionesService: EntregasExportacionesService
    ) { }

    ngOnInit() {
    }

    // funcion encargada de exportar el listado a excel
    exportarAExcel() {
        let movimientos: Array<MovimientoEntrega> = this.data.movimientos;
        this.exportacionesService.exportarListadoEntregasDetalleExcel(movimientos);
    }

    // funcion encargada de exportar el listado a pdf
    exportarAPDF() {
        let movimientos: Array<MovimientoEntrega> = this.data.movimientos;
        let totales: EntregasTotales = this.data.totales;
        this.exportacionesService.exportarListadoEntregasDetallePDF(movimientos, totales);
    }

}
