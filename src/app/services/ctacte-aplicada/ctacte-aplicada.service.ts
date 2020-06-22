import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroCtacteAplicada } from '../../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Cacheable } from 'ngx-cacheable';
import { MovimientoCtaCteAplicada } from '../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';

@Injectable({
  providedIn: 'root'
})
export class CtacteAplicadaService {

  private urlCuentaCorrienteAplicadaListado = `${environment.hostCtaCte}/CuentaAplicadaCorriente/listado`;
  private urlCuentaCorrienteAplicadaSaldoGlobal = `${environment.hostCtaCte}/CuentaAplicadaCorriente/saldoGlobal`;
  private urlCuentaCorrienteAplicadaSaldo = `${environment.hostCtaCte}/CuentaAplicadaCorriente/saldo`;
  private urlCuentaCorrienteAplicadaSaldoSegunComprobantes = `${environment.hostCtaCte}/CuentaAplicadaCorriente/saldoComprobantes`;
  private urlCuentaCorrienteAplicadaComprobantesAgrupadosPorVencimiento = `${environment.hostCtaCte}/CuentaAplicadaCorriente/comprobantesAgrupadosPorVencimiento`;

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con la ctacte corriente aplicada asociado a una cuenta dada
  @Cacheable()
  listadoCtaCte(filtro: FiltroCtacteAplicada) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlCuentaCorrienteAplicadaListado,
      JSON.stringify(filtro),
      httpOptions);
  }

  /**
   * Devuelve el saldo global calculado
   * @param cuenta Identificador del productor
   */
  @Cacheable()
  saldoGlobal(cuenta: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlCuentaCorrienteAplicadaSaldoGlobal}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Devuelve el saldo de la cuenta corriente aplicada
   * @param filtro 
   */
  @Cacheable()
  saldoCtaCte(filtro: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlCuentaCorrienteAplicadaSaldo,
      JSON.stringify(filtro),
      httpOptions);
  }

  /**
   * Devuelve el saldo segun comprobantes dados teniendo en cuenta la diferencia de cambio y el iva del mismo
   * @param movimientosCtaCteAplicada 
   */
  saldoSegunComprobantes(movimientosCtaCteAplicada: Array<MovimientoCtaCteAplicada>): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlCuentaCorrienteAplicadaSaldoSegunComprobantes, movimientosCtaCteAplicada, httpOptions);
  }

  /**
   * Retorna lo disponble a cobrar, a cobrar vencido agrupado por fecha de vencimiento junto a sus comprobantes
   * @param cuenta 
   */
  comprobantesAgrupadosPorVencimiento(cuenta: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlCuentaCorrienteAplicadaComprobantesAgrupadosPorVencimiento}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }
}
