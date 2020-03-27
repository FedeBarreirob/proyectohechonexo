import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ReporteUsuariosDataSource } from '../../../../../datasources/reporte-usuarios-data-source';
import { MatPaginator, MatSort } from '@angular/material';
import { ReporteUsuariosService } from '../../../../../services/reportes/reportes-usuarios/reporte-usuarios.service';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'email', 'entidadCodigo', 'codComercial', 'localidad', 'entroAlApp', 'ejecutoElAppMovil', 'pushSuscripto'];
  dataSource: ReporteUsuariosDataSource;
  pageSizeDefault = 10;

  constructor(private reporteUsuariosService: ReporteUsuariosService) { }

  ngOnInit() {
    this.dataSource = new ReporteUsuariosDataSource(this.reporteUsuariosService);
    this.dataSource.load(0, this.pageSizeDefault);
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
      this.sort.direction
    );
  }
}
