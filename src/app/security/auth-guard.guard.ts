import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // si existe, esta logueado
    if (this.authenticationService.esLogueado && this.elRolPermiteIngresar(next.data)) {
      
      // indicamos que el login es ok para que carge las opciones del menu
      this.authenticationService.loginCompleto();
      
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  // funcion que verifica si el rol del perfil del usuario logueado le permite ingresar a la seccion indicada
  private elRolPermiteIngresar(data: any): boolean {
    let perfil = this.authenticationService.perfilUsuarioLogueado();
    if (data != null && data.rolAdmin != null && perfil != null && perfil.rol != null) {
      if (data.rolAdmin == true && perfil.rol.admin == true) {
        return true;
      } else if (data.rolAdmin == false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
