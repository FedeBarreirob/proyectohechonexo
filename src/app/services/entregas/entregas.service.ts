import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroEntregas } from '../../interfaces/entregas/filtro-entregas';
import { ListadoEntregas } from '../../interfaces/entregas/listado-entregas';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  private urlEntregasListado = `${environment.hostEntregasYVentas}/Entregas/listado`;
  private urlEntregasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Entregas/filtrosEspecieCosechas`;

  constructor(private http: HttpClient) { 
    this.urlEntregasListado = `${environment.hostEntregasYVentas}/Entregas/listado`;
    this.urlEntregasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Entregas/filtrosEspecieCosechas`;

  }

  // funcion que retorna un observable del listado con las entregas asociado a una cuenta dada
  listadoEntregas(filtro: FiltroEntregas, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoEntregas>(this.urlEntregasListado,
      JSON.stringify(filtro),
      httpOptions);
  }

  // funcion que retorna un listado de filtros especie cosecha
  listadoFiltrosEspecieCosecha(cuenta: string, token: string): Observable<Array<FiltroEspecieCosecha>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let urlConParametro = `${this.urlEntregasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<Array<FiltroEspecieCosecha>>(urlConParametro, httpOptions);
  }
}
