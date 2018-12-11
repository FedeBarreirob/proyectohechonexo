import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TerceroBasico } from '../../interfaces/acceso-terceros/tercero-basico';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { environment } from '../../../environments/environment';
import { FiltroGenericoListaConFiltroId } from '../../interfaces/varios/filtro-generico-lista-con-filtroid';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  constructor(private http: HttpClient) { }

  // funcion encargada de registrar un nuevo acceso a tercero
  registrarNuevo(nuevoAccesoTercero: TerceroBasico, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let nuevoAccesoTerceroJson = JSON.stringify(nuevoAccesoTercero);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadTerceroRegistrar, nuevoAccesoTerceroJson, httpOptions);
  }

  // funcion que devuelve un listado paginado
  listadoPaginado(filtro: FiltroGenericoListaConFiltroId, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let filtroJson = JSON.stringify(filtro);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadTerceroListar, filtroJson, httpOptions);
  }

  // funcion encargada de actualizar la informacion de un acceso a tercero existente
  actualizar(accesoTercero: TerceroBasico, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let accesoTerceroJson = JSON.stringify(accesoTercero);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadTerceroModificar, accesoTerceroJson, httpOptions);
  }
}
