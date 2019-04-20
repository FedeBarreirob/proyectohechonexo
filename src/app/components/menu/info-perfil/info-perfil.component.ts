import { Component, OnInit } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit {

  perfilBasico: PerfilBasico;
  nombre: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
        this.cargarNombreUsuario();
      });

    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
    this.cargarNombreUsuario();
  }

  // funcion encargada de cargar los datos del perfil junto al avatar
  cargarNombreUsuario() {
    if (this.perfilBasico && this.perfilBasico.informacionPersonal && this.perfilBasico.informacionPersonal.nombre) {
      this.nombre = this.perfilBasico.informacionPersonal.nombre;
    } else {
      this.nombre = "-";
    }
  }
}
