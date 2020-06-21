import { DataSource } from "@angular/cdk/table";
import { ResumenContratoCompraVenta } from "../interfaces/contratos/resumen-contrato-compra-venta";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ContratosService } from "../services/contratos/contratos.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { FiltroResumenContratoCompraVenta } from "../interfaces/contratos/filtro-resumen-contrato-compra-venta";
import { ResponseListadoPaginado } from "../interfaces/varios/response-listado-paginado";

export class ContratosDataSource implements DataSource<ResumenContratoCompraVenta> {

    private resumenesContratosSubject = new BehaviorSubject<ResumenContratoCompraVenta[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public dataLength: number = 0;

    constructor(private contratosService: ContratosService) { }

    connect(collectionViewer: CollectionViewer): Observable<ResumenContratoCompraVenta[]> {
        return this.resumenesContratosSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.resumenesContratosSubject.complete();
        this.loadingSubject.complete();
    }

    load(filtroPaginado: FiltroResumenContratoCompraVenta) {

        this.loadingSubject.next(true);

        this.contratosService.listadoContratosResumidos(filtroPaginado).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((response: ResponseListadoPaginado) => {
                if (response.exito) {
                    this.dataLength = response.datos.cantidadTotalRegistros;
                    this.resumenesContratosSubject.next(response.datos.listado);
                }
            });
    }
}
