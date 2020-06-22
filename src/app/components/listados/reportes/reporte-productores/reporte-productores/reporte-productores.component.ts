import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReporteProductoresDataSource } from '../../../../../datasources/reporte-productores-data-source';
import { MatPaginator, MatSort } from '@angular/material';
import { ReporteProductoresService } from '../../../../../services/reportes/reportes-productores/reportes-productores.service';
import { tap, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { ExcelService } from '../../../../../services/sharedServices/exportadores/excel/excel.service';

@Component({
  selector: 'app-reporte-productores',
  templateUrl: './reporte-productores.component.html',
  styleUrls: ['./reporte-productores.component.css']
})
export class ReporteProductoresComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['codigo', 'nombre', 'email', 'cuit', 'telefono', 'comercial'];
  dataSource: ReporteProductoresDataSource;
  loading: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private reporteProductoresService: ReporteProductoresService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.dataSource = new ReporteProductoresDataSource(this.reporteProductoresService);
    this.dataSource.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Genera y descarga el archivo excel
   */
  botonDescargarExcel() {
    if (this.loading == false) {
      this.loading = true;

      this.reporteProductoresService.reporte()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            if (response.exito == true) {
              this.excelService.exportAsExcelFile(response.datos, "reporte_productores");
            }
          },
          error => {
            console.log(error);
            this.loading = false;
          },
          () => this.loading = false
        );
    }
  }

}
