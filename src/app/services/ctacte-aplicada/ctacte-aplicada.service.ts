import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroCtacteAplicada } from '../../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { ListadoCtacteAplicada } from '../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CtacteAplicadaService {

  private urlCuentaCorrienteAplicadaListado = `${environment.hostCtaCte}/CuentaAplicadaCorriente/listado`;

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con la ctacte corriente aplicada asociado a una cuenta dada
  listadoCtaCte(filtro: FiltroCtacteAplicada, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoCtacteAplicada>(this.urlCuentaCorrienteAplicadaListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
