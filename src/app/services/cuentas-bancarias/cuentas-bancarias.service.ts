import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class CuentasBancariasService {

  private urlCuentasBancariasDeEntidad = `${environment.hostCtaCte}/cuentasBancarias/entidad`;
  private urlCuentasBancariasRegistro = `${environment.hostCtaCte}/cuentasBancarias`;

  constructor(private http: HttpClient) { }

  /**
   * Devuelve las cuentas bancarias de una cuanta dada
   * @param cuenta 
   */
  @Cacheable()
  cuentasBancarias(cuenta: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlCuentasBancariasDeEntidad}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Registra una nueva cuenta bancaria
   * @param cuentaBancaria 
   */
  cuentasBancariasRegistro(cuentaBancaria: any): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlCuentasBancariasRegistro, cuentaBancaria, httpOptions);
  }
}
