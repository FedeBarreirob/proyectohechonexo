import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ReporteUsuariosDataSource } from '../../../../../datasources/reporte-usuarios-data-source';
import { MatPaginator, MatSort } from '@angular/material';
import { ReporteUsuariosService } from '../../../../../services/reportes/reportes-usuarios/reporte-usuarios.service';
import { tap, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { ExcelService } from '../../../../../services/sharedServices/exportadores/excel/excel.service';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'email', 'entidadCodigo', 'nombreComercial', 'nombreOriginador', 'localidad', 'entroAlApp', 'ejecutoElAppMovil', 'pushSuscripto', 'ultimoIngreso'];
  dataSource: ReporteUsuariosDataSource;
  pageSizeDefault = 10;
  fechaDesde: Date = null;
  fechaHasta: Date = null;
  loading: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private reporteUsuariosService: ReporteUsuariosService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.dataSource = new ReporteUsuariosDataSource(this.reporteUsuariosService);
    this.dataSource.load(0, this.pageSizeDefault);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.fechaDesde,
      this.fechaHasta
    );
  }

  /**
   * Ejecuta la carga por filtro
   * @param filtro 
   */
  botonAplicar(filtro: any) {
    this.fechaDesde = filtro.fechaDesde;
    this.fechaHasta = filtro.fechaHasta;
    this.paginator.pageIndex = 0;

    this.loadPage();
  }

  /**
   * Genera y descarga el archivo excel
   */
  botonDescargarExcel() {
    if (this.loading == false) {
      this.loading = true;

      this.reporteUsuariosService.reporteCompleto(
        this.sort.active,
        this.sort.direction,
        this.fechaDesde,
        this.fechaHasta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            if (response.exito == true) {
              this.excelService.exportAsExcelFile(response.datos.listado, "reporte_usuarios");
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
