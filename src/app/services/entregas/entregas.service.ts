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
  private urlMercadoDeGranoPrecios = `${environment.hostEntregasYVentas}/mercadoDeGrano/precios`;
  private urlcontratosConDispPendFijarPesificar = `${environment.hostEntregasYVentas}/contratos/contratosConDispPendFijarPesificar`;
  private urlcontratosConDispPendFijarPesificarFiltroCosecha = `${environment.hostEntregasYVentas}/contratos/contratosConDispPendFijarPesificarFiltrosCosechas`;

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

  /**
   * Devuelve un listado de movimientos de ctacte aplicada filtrada por get
   * @param filtro 
   */
  listadocontratosConDispPendFijarPesificar(filtro: any) { //crear interface ng g i FiltroCtoDisp

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: <any>filtro
    };

    return this.http.get<ResponseServicio>(this.urlcontratosConDispPendFijarPesificar, httpOptions);
  }

  /**
   * Devuelve un listado de precios correspondientes a las especies indicada
   * @param especies ej: SOJA,TRIG,MAIZ
   * @param monedas ej: P,C,D
   * @param bolsa ej: BPR (bolsa de rosario)
   */
  mercadoDeGranoPrecios(especies: Array<string>, monedas: Array<string>, bolsa: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let especiesParam = especies.join(",");
    let monedasParam = monedas.join(",");

    let urlConParametro = `${this.urlMercadoDeGranoPrecios}/${especiesParam}/${monedasParam}/${bolsa}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Devuelve un listado de cosechas donde existen boletos pendientes de fijar y o pesificar
   * @param cuenta 
   * @param especie 
   */
  @Cacheable()
  listadocontratosConDispPendFijarPesificarFiltroCosecha(cuenta: string, especie: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let url = `${this.urlcontratosConDispPendFijarPesificarFiltroCosecha}/${cuenta}/${especie}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }
}
