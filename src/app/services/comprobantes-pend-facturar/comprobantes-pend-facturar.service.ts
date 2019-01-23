import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroComprobantesPendFacturar } from '../../interfaces/comprobantes-pend-facturar/filtro-comp-pend-fact';
import { ListadoComprobantesPendFact } from '../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesPendFacturarService {

  private urlComprobantesPendientesDeFacturarListado = `${environment.hostEntregasYVentas}/ComprobantesPendientesDeFacturar/listado`;

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con los comprobantes pendientes de facturar asociado a una cuenta dada
  listadoComprobPendFact(filtro: FiltroComprobantesPendFacturar, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoComprobantesPendFact>(this.urlComprobantesPendientesDeFacturarListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
