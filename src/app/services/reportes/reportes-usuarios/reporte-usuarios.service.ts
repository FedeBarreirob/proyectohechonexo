import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListadoPaginado } from '../../../interfaces/varios/response-listado-paginado';

@Injectable({
  providedIn: 'root'
})
export class ReporteUsuariosService {

  private urlReporteUsuarios = `${environment.hostSeguridad}/reportes/reporteCuentasUsuarios`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retorna reporte de usuarios
   * @param pagina 
   * @param cantPorPagina 
   * @param campoOrden 
   * @param orden 
   */
  reporte(pagina: number, cantPorPagina: number, campoOrden: string, orden: string): Observable<ResponseListadoPaginado> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlReporteUsuarios}/${pagina}/${cantPorPagina}/${campoOrden}/${orden}`;
    return this.http.get<ResponseListadoPaginado>(urlConParametro, httpOptions);
  }
}
