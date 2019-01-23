import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroVentas } from '../../interfaces/ventas/filtro-ventas';
import { ListadoVentas } from '../../interfaces/ventas/listado-ventas';
import { environment } from '../../../environments/environment';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private urlVentasListado = `${environment.hostEntregasYVentas}/Ventas/listado`;
  private urlVentasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Ventas/filtrosEspecieCosechas`;

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con las ventas asociado a una cuenta dada
  listadoVentas(filtro: FiltroVentas, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoVentas>(this.urlVentasListado,
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

    let urlConParametro = `${this.urlVentasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<Array<FiltroEspecieCosecha>>(urlConParametro, httpOptions);
  }

}
