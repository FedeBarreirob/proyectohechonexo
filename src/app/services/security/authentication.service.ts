import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseAutentificacion } from '../../interfaces/security/response.autentificacion';
import { environment } from '../../../environments/environment'
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

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
    localStorage.removeItem('currentUserPerfil');
  }

  // funcion que indica si el usuario se encuentra logueado en el sistema
  // no se verifica validez del token asociado
  get esLogueado() {
    if (localStorage.getItem('currentUser')) {
      let usuario = JSON.parse(localStorage.getItem('currentUser'));
      return !this.jwtHelper.isTokenExpired(usuario.token);
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

  // funcion que devuelve el perfil del usuario logueado
  perfilUsuarioLogueado() {
    if (this.esLogueado) {
      return <PerfilBasico>JSON.parse(localStorage.getItem('currentUserPerfil'));
    } else {
      return null;
    }
  }

  // funcion que indica si el usuario es admin
  get esAdmin() {
    let perfil = this.perfilUsuarioLogueado();
    if (perfil != null && perfil.rol != null) {
      return perfil.rol.admin;
    } else {
      return false;
    }
  }

}
