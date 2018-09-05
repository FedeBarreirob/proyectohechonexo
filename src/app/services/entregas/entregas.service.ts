import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroEntregas } from '../../interfaces/entregas/filtro-entregas';
import { ListadoEntregas } from '../../interfaces/entregas/listado-entregas';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con las entregas asociado a una cuenta dada
  listadoEntregas(filtro: FiltroEntregas, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoEntregas>(environment.urlEntregasListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
