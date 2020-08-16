import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class OnboardingUsuariosService {

  private urlOnboardingRegistrarUsuario = `${environment.hostSeguridad}/onboarding/registrarUsuario`;

  constructor(private http: HttpClient) { }

  /**
   * Función encargada de registrar los datos de usuario
   * @param datosUsuario 
   */
  registrar(datosUsuario: any): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseServicio>(
      this.urlOnboardingRegistrarUsuario, datosUsuario, httpOptions);
  }
}
