import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class FinanzasProgramadorPagosService {

  private urlRegistrarSolicitudDePago = `${environment.hostFinanzas}/programadorDePagos/registrarSolicitudDePago`;

  constructor(private http: HttpClient) { }

  /**
   * Registra una nueva solicitud de pago
   * @param solicitudDePago 
   */
  registroSolicitudDePago(solicitudDePago: any): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlRegistrarSolicitudDePago, solicitudDePago, httpOptions);
  }
}
