import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroMercaderiaPendEntregar } from '../../interfaces/mercaderia-pend-entregar/filtro-merc-pend-entregar';
import { ListadoMercPendEntregar } from '../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercPendEntregarService {

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con las mercaderias pendientes de entregar asociado a una cuenta dada
  listadoMercPendEntregar(filtro: FiltroMercaderiaPendEntregar, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<ListadoMercPendEntregar>(environment.urlMercaderiaPendienteEntregarListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
