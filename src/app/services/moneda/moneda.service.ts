import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private urlMonedaCotizacion = `${environment.hostCtaCte}/moneda/cotizacion`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Devuelve la cotización de la moneda indicada a la fecha de hoy
   * @param codMoneda Código de la moneda
   */
  @Cacheable()
  cotizacionHoy(codMoneda: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${this.urlMonedaCotizacion}/${codMoneda}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }
}
