import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-avatar-del-perfil',
  templateUrl: './avatar-del-perfil.component.html',
  styleUrls: ['./avatar-del-perfil.component.css']
})
export class AvatarDelPerfilComponent implements OnInit, OnDestroy {

  perfilBasico: PerfilBasico;
  avatar: string;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.seleccionarAvatar();
        });

    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
    this.seleccionarAvatar();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de seleccionar la imagen en funcion del perfil activo
  private seleccionarAvatar() {
    if (this.perfilBasico && this.perfilBasico.informacionPersonal && this.perfilBasico.informacionPersonal.avatar && this.perfilBasico.informacionPersonal.avatar !== "") {
      this.avatar = this.perfilBasico.informacionPersonal.avatar;
    } else {
      this.avatar = "assets/perfil/sin-foto.jpg";
    }
  }
}
