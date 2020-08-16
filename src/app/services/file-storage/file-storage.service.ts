import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrupoDeDocumentaciones } from '../../enums/grupo-de-documentaciones.enum';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private urlPerfDocAvanceDeCarga = `${environment.hostFileStorage}/perfilesDocumentaciones/avanceDeCarga`;

  constructor(private http: HttpClient) { }

  /**
   * Devuelve el avance de carga de kla documentación indicada
   * @param perfilId 
   * @param grupoDeNotificacion 
   */
  avanceDeCarga(perfilId: number, grupoDeNotificacion: GrupoDeDocumentaciones): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${this.urlPerfDocAvanceDeCarga}/${perfilId}/${grupoDeNotificacion}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }
}
