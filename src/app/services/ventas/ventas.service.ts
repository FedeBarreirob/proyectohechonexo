import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroVentas } from '../../interfaces/ventas/filtro-ventas';
import { environment } from '../../../environments/environment';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { Observable } from 'rxjs';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private urlVentasListado = `${environment.hostEntregasYVentas}/Ventas/listado`;
  private urlVentasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Ventas/filtrosEspecieCosechas`;

  constructor(
    private http: HttpClient
  ) { }

  // funcion que retorna un observable del listado con las ventas asociado a una cuenta dada
  @Cacheable()
  listadoVentas(filtro: FiltroVentas) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlVentasListado, JSON.stringify(filtro), httpOptions);
  }

  // funcion que retorna un listado de filtros especie cosecha
  @Cacheable()
  listadoFiltrosEspecieCosecha(cuenta: string): Observable<FiltroEspecieCosecha> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlVentasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<FiltroEspecieCosecha>(urlConParametro, httpOptions);
  }

}
