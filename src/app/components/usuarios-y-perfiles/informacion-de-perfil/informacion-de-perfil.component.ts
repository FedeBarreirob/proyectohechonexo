import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PerfilBasicoInfoPersonal } from '../../../interfaces/perfiles/perfil-basico-informacion-personal';
import { AccesoTercerosComponent } from '../terceros/acceso-terceros/acceso-terceros.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-informacion-de-perfil',
  templateUrl: './informacion-de-perfil.component.html',
  styleUrls: ['./informacion-de-perfil.component.css']
})
export class InformacionDePerfilComponent implements OnInit {

  cargando: boolean;
  perfilBasico: PerfilBasico;
  avatar: string;
  cargando$: Subject<boolean> = new Subject<boolean>();

  unidadMedidaPesoSeleccionado: string;

  constructor(
    private authenticationService: AuthenticationService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cargando = false;

    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
        this.seleccionarAvatar();
        this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
      });

    this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
  }

  // funcion encargada de seleccionar la imagen en funcion del perfil activo
  private seleccionarAvatar() {
    if (this.perfilBasico && this.perfilBasico.informacionPersonal && this.perfilBasico.informacionPersonal.avatar && this.perfilBasico.informacionPersonal.avatar !== "") {
      this.avatar = this.perfilBasico.informacionPersonal.avatar;
    } else {
      this.avatar = "assets/perfil/sin-foto.jpg";
    }
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  // funcion encargada de actualizar la unidad de medida
  actualizarUnidadDeMedidaPeso(nuevaUnidad: string) {
    if (this.cargando == false) {

      this.cargando = true;
      this.cargando$.next(true);

      let perfilBasicoInfoPersonal: PerfilBasicoInfoPersonal = {
        id: this.perfilBasico.informacionPersonal.id,
        unidadMedidaPeso: nuevaUnidad
      };

      this.perfilesService.actualizarUnidadMedidaPeso(perfilBasicoInfoPersonal)
        .subscribe(
          respuesta => {
            if (respuesta.exito) {
              this.unidadMedidaPesoSeleccionado = nuevaUnidad;

              let mensaje = `${respuesta.mensaje} - Deberá salir y volver a entrar al sistema para que los cambios surtan efecto.`;

              this.openSnackBar(mensaje);
            } else {
              this.openSnackBar(respuesta.mensaje);
            }

            this.cargando = false;
            this.cargando$.next(false);
          },
          error => {
            console.log(error);
            this.openSnackBar("Error al intentar actualizar la unidad de medida.");
            this.cargando = false;
            this.cargando$.next(false);
          }
        );
    }
  }

	/**
	 * Abre el modal para editar el perfil
	 */
  editar() {
  }

	/**
	 * Abre modal para la edición de accesos a terceros
	 */
  accesoATerceros() {
    this.dialog.open(AccesoTercerosComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'modal-sin-padding'
    });
  }
}
