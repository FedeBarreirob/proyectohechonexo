import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../security/authentication.service';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { UserAuth } from '../../models/security/user';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private urlMonedaCotizacion = `${environment.hostCtaCte}/moneda/cotizacion`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Devuelve la cotización de la moneda indicada a la fecha de hoy
   * @param codMoneda Código de la moneda
   */
  @Cacheable()
  cotizacionHoy(codMoneda: string): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let url = `${this.urlMonedaCotizacion}/${codMoneda}`;
    return this.http.get<ResponseServicio>(url, httpOptions);
  }
}
