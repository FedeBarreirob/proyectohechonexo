import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CtacteService {

  private urlCuentaCorrienteListado = `${environment.hostCtaCte}/CuentaCorriente/listado`;
  private urlCuentaCorrienteSaldo = `${environment.hostCtaCte}/CuentaCorriente/saldo`;

  constructor(
    private http: HttpClient) { }

  // funcion que retorna un observable del listado con la ctacte corriente asociado a una cuenta dada
  @Cacheable()
  listadoCtaCte(filtro: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlCuentaCorrienteListado,
      JSON.stringify(filtro),
      httpOptions);
  }

  /**
   * Devuelve el saldo
   * @param filtro 
   */
  @Cacheable()
  saldoCtaCte(filtro: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlCuentaCorrienteSaldo,
      JSON.stringify(filtro),
      httpOptions);
  }
}
