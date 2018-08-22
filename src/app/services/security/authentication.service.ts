import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from '../../models/security/user';
import { ResponseAutentificacion } from '../../interfaces/security/response.autentificacion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let credenciales = JSON.stringify({
      "username": username,
      "password": password
    });
    
   return this.http.post<ResponseAutentificacion>("http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/autentificacion/login",
      credenciales,
      httpOptions);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
