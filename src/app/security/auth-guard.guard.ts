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

    if (this.authenticationService.esLogueado) {

      if (this.elRolPermiteIngresar(next.data)) {
        this.authenticationService.loginCompleto();
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    } else {
      let tokenOk: boolean;

      let response = this.authenticationService.renovarToken();
      response.then((renovacionOk: boolean) => {
        if (renovacionOk == true) {
          tokenOk = true;
        } else {
          tokenOk = false;
        }
      });

      if (tokenOk == false) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      } else {
        if (this.elRolPermiteIngresar(next.data)) {
          this.authenticationService.loginCompleto();
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
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
