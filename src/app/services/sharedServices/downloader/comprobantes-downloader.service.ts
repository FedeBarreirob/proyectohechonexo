import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComprobanteParaDescarga } from '../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesDownloaderService {

  private urlCtaCteComprobantesDescargar = `${environment.hostCtaCte}/Comprobantes/descargar`;
  private urlCtaCteComprobantesDescargarMasivo = `${environment.hostCtaCte}/Comprobantes/descargarMasivo`;

  constructor(private http: HttpClient) { }

  // funcion que devuelve un comprobante pdf a partir del link y nombre de comprobante dado
  comprobanteDescargado(link: string, comprobante: string, token: string): Observable<Blob> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams().set('link', link).set('comprobante', comprobante);

    const options = {
      headers, params, responseType: 'blob' as 'blob'
    }

    return this.http.get(this.urlCtaCteComprobantesDescargar, options);
  }

  // funcion que devuelve un zip con comprobantes pdf a partir de un listado de comprobantes a descargar
  comprobanteDescargadoMasivo(comprobantes: Array<ComprobanteParaDescarga>, token: string): Observable<Blob> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'blob'
    };

    return this.http.post(this.urlCtaCteComprobantesDescargarMasivo, JSON.stringify(comprobantes), httpOptions);
  }
}
