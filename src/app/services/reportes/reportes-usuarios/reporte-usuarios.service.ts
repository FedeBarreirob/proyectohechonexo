import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListadoPaginado } from '../../../interfaces/varios/response-listado-paginado';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReporteUsuariosService {

  private urlReporteUsuarios = `${environment.hostSeguridad}/reportes/reporteCuentasUsuarios`;
  private urlReporteUsuariosCompleto = `${environment.hostSeguridad}/reportes/reporteCuentasUsuariosCompleto`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  /**
   * Retorna reporte de usuarios
   * @param pagina 
   * @param cantPorPagina 
   * @param campoOrden 
   * @param orden 
   * @param desde 
   * @param hasta 
   */
  reporte(pagina: number, cantPorPagina: number, campoOrden: string, orden: string, desde?: Date, hasta?: Date): Observable<ResponseListadoPaginado> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let desdeParam: string = (desde) ? this.datePipe.transform(desde, 'yyyy-MM-dd') : '-';
    let hastaParam: string = (hasta) ? this.datePipe.transform(hasta, 'yyyy-MM-dd') : '-';

    let urlConParametro = `${this.urlReporteUsuarios}/${pagina}/${cantPorPagina}/${campoOrden}/${orden}/${desdeParam}/${hastaParam}`;
    return this.http.get<ResponseListadoPaginado>(urlConParametro, httpOptions);
  }

  /**
   * Retorna reporte de usuarios sin paginación
   * @param campoOrden 
   * @param orden 
   * @param desde 
   * @param hasta 
   */
  reporteCompleto(campoOrden: string, orden: string, desde?: Date, hasta?: Date): Observable<ResponseListadoPaginado> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let desdeParam: string = (desde) ? this.datePipe.transform(desde, 'yyyy-MM-dd') : '-';
    let hastaParam: string = (hasta) ? this.datePipe.transform(hasta, 'yyyy-MM-dd') : '-';

    let urlConParametro = `${this.urlReporteUsuariosCompleto}/${campoOrden}/${orden}/${desdeParam}/${hastaParam}`;
    return this.http.get<ResponseListadoPaginado>(urlConParametro, httpOptions);
  }
}
