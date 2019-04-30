import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroListadoCtaCte } from '../../interfaces/ctacte/filtro.listado.ctacte';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../security/authentication.service';
import { UserAuth } from '../../models/security/user';

@Injectable({
  providedIn: 'root'
})
export class CtacteService {

  private urlCuentaCorrienteListado = `${environment.hostCtaCte}/CuentaCorriente/listado`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // funcion que retorna un observable del listado con la ctacte corriente asociado a una cuenta dada
  listadoCtaCte(filtro: any) {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    return this.http.post<any>(this.urlCuentaCorrienteListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
