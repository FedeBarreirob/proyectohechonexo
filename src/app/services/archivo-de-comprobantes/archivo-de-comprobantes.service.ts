import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { FiltroCtaCteComprobanteDescarga } from '../../interfaces/archivo-de-comprobantes/filtro-cta-cte-comprobante-descarga';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';
import { UserAuth } from '../../models/security/user';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ArchivoDeComprobantesService {

  private urlCtaCteArchivoDeComprobantesComprobantes = `${environment.hostCtaCte}/archivosDeOperaciones/comprobantes`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Función que devuelve un listado de comprobantes segun filtro indicado
   * @param filtro 
   */
  @Cacheable()
  comprobantesFiltrados(filtro: FiltroCtaCteComprobanteDescarga): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    return this.http.post<ResponseServicio>(this.urlCtaCteArchivoDeComprobantesComprobantes, JSON.stringify(filtro), httpOptions);
  }
}
