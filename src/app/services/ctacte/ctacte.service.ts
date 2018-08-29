import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroListadoCtaCte } from '../../interfaces/ctacte/filtro.listado.ctacte';
import { ListadoCuentaCorriente } from '../../interfaces/ctacte/listado.ctacte';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CtacteService {

  constructor(private http: HttpClient) { }

  // funcion que retorna un observable del listado con la ctacte corriente asociado a una cuenta dada
  listadoCtaCte (filtro: FiltroListadoCtaCte, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       })
    };

    return this.http.post<ListadoCuentaCorriente>(environment.urlCuentaCorrienteListado,
      JSON.stringify(filtro),
      httpOptions);
  }
}
