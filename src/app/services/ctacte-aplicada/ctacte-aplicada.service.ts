import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroCtacteAplicada } from '../../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { AuthenticationService } from '../security/authentication.service';
import { UserAuth } from '../../models/security/user';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CtacteAplicadaService {

  private urlCuentaCorrienteAplicadaListado = `${environment.hostCtaCte}/CuentaAplicadaCorriente/listado`;
  private urlCuentaCorrienteAplicadaSaldoGlobal = `${environment.hostCtaCte}/CuentaAplicadaCorriente/saldoGlobal`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // funcion que retorna un observable del listado con la ctacte corriente aplicada asociado a una cuenta dada
  @Cacheable()
  listadoCtaCte(filtro: FiltroCtacteAplicada) {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
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

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlCuentaCorrienteAplicadaSaldoGlobal}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }
}
