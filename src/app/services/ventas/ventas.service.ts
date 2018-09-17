import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroVentas } from '../../interfaces/ventas/filtro-ventas';
import { ListadoVentas } from '../../interfaces/ventas/listado-ventas';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con las ventas asociado a una cuenta dada
  listadoVentas(filtro: FiltroVentas, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoVentas>(environment.urlVentasListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
