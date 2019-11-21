import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroEntregas } from '../../interfaces/entregas/filtro-entregas';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { Cacheable } from 'ngx-cacheable';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  private urlEntregasListado = `${environment.hostEntregasYVentas}/Entregas/listado`;
  private urlEntregasFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/Entregas/filtrosEspecieCosechas`;
  private urlEntregasIndicadorGlobal = `${environment.hostEntregasYVentas}/Entregas/indicadorGlobal`;

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con las entregas asociado a una cuenta dada
  @Cacheable()
  listadoEntregas(filtro: FiltroEntregas) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlEntregasListado,
      JSON.stringify(filtro),
      httpOptions);
  }

  // funcion que retorna un listado de filtros especie cosecha
  @Cacheable()
  listadoFiltrosEspecieCosecha(cuenta: string): Observable<FiltroEspecieCosecha> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlEntregasFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<FiltroEspecieCosecha>(urlConParametro, httpOptions);
  }

  /**
   * Devuelve los indicadores de entregas totales: pactado, entregado, aplicado
   * @param filtro 
   */
  @Cacheable()
  indicadorGlobal(filtro: FiltroEntregas): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlEntregasIndicadorGlobal,
      JSON.stringify(filtro),
      httpOptions);
  }
}
