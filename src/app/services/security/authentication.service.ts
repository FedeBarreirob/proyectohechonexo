import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseAutentificacion } from '../../interfaces/security/response.autentificacion';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // funcion encargada de autenticar el usuario y obtener el token requerido para el consumo de servicios
  login(username: string, password: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let credenciales = JSON.stringify({
      "username": username,
      "password": password
    });

    return this.http.post<ResponseAutentificacion>(environment.urlSeguridadLogin,
      credenciales,
      httpOptions);
  }

  // cierra la sesion
  logout() {
    localStorage.removeItem('currentUser');
  }

  // funcion que indica si el usuario se encuentra logueado en el sistema
  // no se verifica validez del token asociado
  get esLogueado() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  // funcion que devuelve el usuario logueado
  usuarioLogueado() {
    if (this.esLogueado) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return null;
    }
  }
}
