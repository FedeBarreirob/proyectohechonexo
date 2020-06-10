import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ReporteProductoresService } from "../services/reportes/reportes-productores/reportes-productores.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";

export class ReporteProductoresDataSource implements DataSource<any> {

  private usuariosSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public dataLength: number = 0;

  constructor(private reporteProductoresService: ReporteProductoresService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.usuariosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usuariosSubject.complete();
    this.loadingSubject.complete();
  }

  load() {
    this.loadingSubject.next(true);

    this.reporteProductoresService.reporte().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe((response: any) => {
        if (response.exito) {
          this.dataLength = response.datos.length;
          this.usuariosSubject.next(response.datos);
        }
      });
  }
}
