import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { FiltroCtaCteComprobanteDescarga } from '../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoDeComprobantesService {

  private urlCtaCteArchivoDeComprobantesComprobantes = `${environment.hostCtaCte}/archivosDeOperaciones/comprobantes`;

  constructor(private http: HttpClient) { }

  // funcion que devuelve un listado de comprobantes segun filtro indicado
  comprobantesFiltrados(filtro: FiltroCtaCteComprobanteDescarga, token: string): Observable<ResponseServicio> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let params = Object.entries(filtro).reduce(
      (params, [key, value]) => params.set(key, value), new HttpParams());

    const options = {
      headers, params
    }

    return this.http.get<ResponseServicio>(this.urlCtaCteArchivoDeComprobantesComprobantes, options);
  }
}
