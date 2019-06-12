import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionTributariaService {

  private urlTenenciaImpositiva = `${environment.hostCtaCte}/informacionTributaria/tenenciaImpositiva`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Devuelve el reporte de tenencias impositivas
   * 
   * @param cuenta Identificador del productor
   * @param fecha Fecha en formato 'yyyy-MM-dd'
   */
  reporte(cuenta: string, fecha: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlTenenciaImpositiva}/${cuenta}/${fecha}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }
}
