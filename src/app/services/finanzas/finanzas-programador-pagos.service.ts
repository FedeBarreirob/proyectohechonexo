import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { FiltroListadoSolicitudes } from '../../interfaces/finanzas/filtro-listado-solicitudes';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class FinanzasProgramadorPagosService {

  private urlRegistrarSolicitudDePago = `${environment.hostFinanzas}/programadorDePagos/registrarSolicitudDePago`;
  private urlListadoSolicitudDePago = `${environment.hostFinanzas}/programadorDePagos/listadoSolicitudes`;
  private urlFiltroEspecie = `${environment.hostFinanzas}/programadorDePagos/filtroEspecie`;

  constructor(private http: HttpClient) { }

  /**
   * Registra una nueva solicitud de pago
   * @param solicitudDePago 
   */
  registroSolicitudDePago(solicitudDePago: any): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlRegistrarSolicitudDePago, solicitudDePago, httpOptions);
  }

  /**
   * Devuelve un listado de solicitudes de pagos
   * @param filtro 
   */
  listadoSolicitudes(filtro: FiltroListadoSolicitudes): Observable<ResponseServicio> {

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: <any>filtro
    };

    return this.http.get<ResponseServicio>(this.urlListadoSolicitudDePago, httpOptions);
  }

  /**
   * Devuelve un listado de especies utilizadas en las solicitudes de pago para utilizarlas en los filtros
   */
  @Cacheable()
  listadoDeEspeciesEnSolicitudes(): Observable<ResponseServicio> {

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this.http.get<ResponseServicio>(this.urlFiltroEspecie, httpOptions);
  }
}
