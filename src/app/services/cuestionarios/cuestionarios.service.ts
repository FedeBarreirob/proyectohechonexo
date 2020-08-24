import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {

  private urlRegistrarRespuestas = `${environment.hostCuestionarios}/formularios/registrarRespuestas`;

  constructor(private http: HttpClient) { }

  /**
   * Registra las respuestas de un cuestionario dado
   * @param cuestionario 
   */
  registrarRespuestas(cuestionario: any): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlRegistrarRespuestas, cuestionario, httpOptions);
  }
}
