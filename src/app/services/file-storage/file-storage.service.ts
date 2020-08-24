import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrupoDeDocumentaciones } from '../../enums/grupo-de-documentaciones.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Documento } from '../../interfaces/documentaciones/documento';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private urlPerfDocAvanceDeCarga = `${environment.hostFileStorage}/perfilesDocumentaciones/avanceDeCarga`;
  private urlDocumentoUpload = `${environment.hostFileStorage}/upload`;
  private urlPerfilDocumentaciones = `${environment.hostFileStorage}/perfilesDocumentaciones`;

  public esDocLegajoCargado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  /**
   * Sube un documento al servidor, devuelve el id del documento subido
   * @param documento 
   * @param descripcion 
   */
  subirDocumento(documento: any, descripcion?: string): Observable<any> {

    var fd = new FormData();
    fd.append('file', documento);

    if (descripcion) {
      fd.append('descripcion', descripcion);
    }

    return this.http.post(this.urlDocumentoUpload, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * Devuelve las documentaciones del perfil indicando las cargadas y las pendientes de cargar
   * verificando si tiene el archivo indicado
   * @param perfilId 
   * @param grupoDeNotificacion 
   */
  documentacionesDelPerfil(perfilId: number, grupoDeNotificacion: GrupoDeDocumentaciones): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${this.urlPerfilDocumentaciones}/${perfilId}/${grupoDeNotificacion}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }

  /**
   * Registra la documentación del usuario
   * @param documentacion 
   */
  registrarDocumentacion(documentacion: Array<Documento>): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(this.urlPerfilDocumentaciones, documentacion, httpOptions);
  }
}
