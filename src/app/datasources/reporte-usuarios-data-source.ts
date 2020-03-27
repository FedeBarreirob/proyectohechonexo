import { DataSource } from "@angular/cdk/table";
import { ReporteUsuarioItem } from "../interfaces/reportes/reporte-usuarios/reporte-usuario-item";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ReporteUsuariosService } from "../services/reportes/reportes-usuarios/reporte-usuarios.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { ResponseListadoPaginado } from "../interfaces/varios/response-listado-paginado";

export class ReporteUsuariosDataSource implements DataSource<ReporteUsuarioItem> {

    private usuariosSubject = new BehaviorSubject<ReporteUsuarioItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public dataLength: number = 0;

    constructor(private reporteUsuariosService: ReporteUsuariosService) { }

    connect(collectionViewer: CollectionViewer): Observable<ReporteUsuarioItem[]> {
        return this.usuariosSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usuariosSubject.complete();
        this.loadingSubject.complete();
    }

    load(pagina: number = 0, cantPorPagina: number = 10, campoOrden: string = "nombre", orden: string = "asc") {

        this.loadingSubject.next(true);

        this.reporteUsuariosService.reporte(pagina + 1, cantPorPagina, campoOrden, orden).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((response: ResponseListadoPaginado) => {
                if (response.exito) {
                    this.dataLength = response.datos.cantidadTotalRegistros;
                    this.usuariosSubject.next(response.datos.listado);
                }
            });
    }
}
