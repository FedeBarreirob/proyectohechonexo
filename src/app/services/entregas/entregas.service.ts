import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroEntregas } from '../../interfaces/entregas/filtro-entregas';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { AuthenticationService } from '../security/authentication.service';
import { UserAuth } from '../../models/security/user';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  private urlEntregasListado = `${environment.hostEntregasYVentas}/Entregas/listado`;
  private urlEntregasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Entregas/filtrosEspecieCosechas`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  // funcion que retorna un observable del listado con las entregas asociado a una cuenta dada
  listadoEntregas(filtro: FiltroEntregas) {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    return this.http.post<any>(this.urlEntregasListado,
      JSON.stringify(filtro),
      httpOptions);
  }

  // funcion que retorna un listado de filtros especie cosecha
  listadoFiltrosEspecieCosecha(cuenta: string): Observable<FiltroEspecieCosecha> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlEntregasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<FiltroEspecieCosecha>(urlConParametro, httpOptions);
  }
}
