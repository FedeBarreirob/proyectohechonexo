import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class FinanzasOnboardingClientesService {

  private urlFormularioInformacion = `${environment.hostFinanzas}/limiteDeCredito/formularioInformacion`;

  constructor(private http: HttpClient) { }

  /**
   * Devuelve el cuestionario de preguntas para el alta de límite de crédito
   * @param perfilId 
   */
  formularioInformacion(perfilId: number): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${this.urlFormularioInformacion}/${perfilId}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }
}
