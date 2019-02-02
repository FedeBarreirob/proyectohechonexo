import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesDownloaderService {

  private urlCtaCteComprobantesDescargar = `${environment.hostCtaCte}/Comprobantes/descargar`;

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
}
