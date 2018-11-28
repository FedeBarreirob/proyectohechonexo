import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PerfilBasico } from 'src/app/interfaces/perfiles/perfil-basico';
import { environment } from 'src/environments/environment';
import { ResponseServicio } from 'src/app/interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }

  // funcion encargada de registrar un nuevo perfil
  registrarNuevo(nuevoPerfil: PerfilBasico) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let nuevoPerfilJson = JSON.stringify(nuevoPerfil);

    return this.http.post<ResponseServicio>(
      environment.urlSeguridadPerfilRegistrar, nuevoPerfilJson, httpOptions);
  }
}
