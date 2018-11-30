import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { environment } from '../../../environments/environment';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { FiltroGenericoLista } from '../../interfaces/varios/filtro-generico-lista';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }

  // funcion encargada de registrar un nuevo perfil
  registrarNuevo(nuevoPerfil: PerfilBasico, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let nuevoPerfilJson = JSON.stringify(nuevoPerfil);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadPerfilRegistrar, nuevoPerfilJson, httpOptions);
  }

  // funcion que devuelve un listado paginado
  listadoPaginado(filtro: FiltroGenericoLista, token: string) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let filtroJson = JSON.stringify(filtro);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadPerfilListar, filtroJson, httpOptions);
  }
}
