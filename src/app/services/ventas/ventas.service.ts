import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroVentas } from '../../interfaces/ventas/filtro-ventas';
import { environment } from '../../../environments/environment';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';
import { UserAuth } from '../../models/security/user';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private urlVentasListado = `${environment.hostEntregasYVentas}/Ventas/listado`;
  private urlVentasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Ventas/filtrosEspecieCosechas`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // funcion que retorna un observable del listado con las ventas asociado a una cuenta dada
  listadoVentas(filtro: FiltroVentas) {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    return this.http.post<any>(this.urlVentasListado, JSON.stringify(filtro), httpOptions);
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

    let urlConParametro = `${this.urlVentasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<FiltroEspecieCosecha>(urlConParametro, httpOptions);
  }

}
