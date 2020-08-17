import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/security/authentication.service';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';
import { RoleEnum } from '../enums/role-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidacionDeIdentidadGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.laIdentidadEsValidada()) {
      return true;
    } else {
      this.router.navigate(['/validar-documentacion']);
      return false;
    }
  }

  laIdentidadEsValidada(): boolean {
    try {
      let perfil: PerfilBasico = this.authenticationService.perfilUsuarioLogueado();

      if (perfil && (perfil.identidadValidada == true || perfil.rol && perfil.rol.id != RoleEnum.PRODUCTOR)) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      console.log(e);
      return true;
    }
  }
}
