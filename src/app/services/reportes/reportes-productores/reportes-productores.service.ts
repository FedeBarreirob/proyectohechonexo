import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteProductoresService {

  private urlReporteUsuariosNoRegistrados = `${environment.hostSeguridad}/reportes/reporteUsuariosNoRegistrados`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retorna reporte de usuarios no registrados
   */
  reporte(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(this.urlReporteUsuariosNoRegistrados, httpOptions);
  }
}
