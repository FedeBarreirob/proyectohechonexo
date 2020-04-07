import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FiltroCtaCteComprobanteDescarga } from '../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Observable } from 'rxjs';
import { Cacheable } from 'ngx-cacheable';
import { FiltroComprobanteDescarga } from '../../interfaces/archivo-de-comprobantes/filtro-comprobante-descarga';
import { map } from 'rxjs/operators';
import { TLSSocket } from 'tls';

@Injectable({
  providedIn: 'root'
})
export class ArchivoDeComprobantesService {

  private urlCtaCteArchivoDeComprobantesComprobantes = `${environment.hostCtaCte}/archivosDeOperaciones/comprobantes`;
  private urlContratosArchivoDeComprobantesComprobantes = `${environment.hostGeneradorComprobantes}/confirmacionesDeVentas/comprobantesContratos`;
  private urlEntregasArchivoDeComprobantesComprobantes = `${environment.hostGeneradorComprobantes}/entregas/comprobantesEntregas`;
  private urlVentasArchivoDeComprobantesComprobantes = `${environment.hostGeneradorComprobantes}/ventas/comprobantesVentas`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función que devuelve un listado de comprobantes de cuenta corriente/aplicada segun filtro indicado
   * @param filtro 
   */
  @Cacheable()
  comprobantesCtaCteFiltrados(filtro: FiltroCtaCteComprobanteDescarga): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlCtaCteArchivoDeComprobantesComprobantes, JSON.stringify(filtro), httpOptions);
  }

  /**
   * Función que devuelve un listado de comprobantes de contratos
   * @param filtro 
   */
  @Cacheable()
  comprobantesContratosFiltrados(filtro: FiltroComprobanteDescarga): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlContratosArchivoDeComprobantesComprobantes, JSON.stringify(filtro), httpOptions);
  }

  /**
   * Función que devuelve un listado de comprobantes de entregas
   * @param filtro 
   */
  @Cacheable()
  comprobantesEntregasFiltrados(filtro: FiltroComprobanteDescarga): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlEntregasArchivoDeComprobantesComprobantes, JSON.stringify(filtro), httpOptions)
      .pipe(
        map(tickets => {
          if (tickets && tickets.exito && tickets.datos && tickets.datos.length > 0) {
            let ticketsConLinkDescarga = tickets.datos.filter(ticket => ticket.link != "0");
            tickets.datos = ticketsConLinkDescarga;
            return tickets;
          } else {
            return tickets;
          }
        }
        )
      );
  }

  /**
   * Función que devuelve un listado de comprobantes de ventas
   * @param filtro 
   */
  @Cacheable()
  comprobantesVentasFiltrados(filtro: FiltroComprobanteDescarga): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlVentasArchivoDeComprobantesComprobantes, JSON.stringify(filtro), httpOptions);
  }
}
