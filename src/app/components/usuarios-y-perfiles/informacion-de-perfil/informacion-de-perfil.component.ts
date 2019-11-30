import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PerfilBasicoInfoPersonal } from '../../../interfaces/perfiles/perfil-basico-informacion-personal';
import { AccesoTercerosComponent } from '../terceros/acceso-terceros/acceso-terceros.component';
import { Subject } from 'rxjs';
import { InfoPerfilCambioPasswordComponent } from '../info-perfil-cambio-password/info-perfil-cambio-password.component';
import { InfoPerfilEdicionComponent } from '../info-perfil-edicion/info-perfil-edicion.component';
import { TutorialModalComponent } from '../../common/tutorial-modal/tutorial-modal.component';

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
    public authenticationService: AuthenticationService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // Modal tutorial
    if (!this.authenticationService.esAdmin && !JSON.parse(localStorage.getItem('perfilTutorial'))) {
      const dialogRef = this.dialog.open(TutorialModalComponent, {
        data: { title: 'Perfil', description: 'En esta sección podés personalizar tu perfil y tu experiencia. Editá tu nombre, incluí una foto y agregá tus datos personales. Generá permisos para que tu equipo o contador puedan acceder a tu cuenta. También podés definir tu preferencia para ver la información de tus negocios de granos en quintales, toneladas o kilos.' }
      });

      dialogRef.afterClosed().subscribe(result => {
        localStorage.setItem('perfilTutorial', JSON.stringify(true));
      });
    }

    this.cargando = false;

    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
        this.seleccionarAvatar();
        this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
      });
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

              let mensaje = `${respuesta.mensaje}`;

              this.perfilesService.reCargarPerfilLogueado().subscribe(
                () => {
                  this.cargando = false;
                  this.cargando$.next(false);
                },
                () => {
                  this.cargando = false;
                  this.cargando$.next(false);
                }
              );

              this.openSnackBar(mensaje);
            } else {
              this.openSnackBar(respuesta.mensaje);
              this.cargando = false;
              this.cargando$.next(false);
            }
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
    let dialogEditarRef = this.dialog.open(InfoPerfilEdicionComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'modal-sin-padding',
      data: this.perfilBasico
    });

    dialogEditarRef.afterClosed().subscribe(
      () => {
        this.cargando = true;
        this.cargando$.next(true);
        this.perfilesService.reCargarPerfilLogueado().subscribe(
          () => {
            this.cargando = false;
            this.cargando$.next(false);
          },
          () => {
            this.cargando = false;
            this.cargando$.next(false);
          }
        );
      }
    );
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

  /**
   * Función que abre un modal 
   */
  cambiarPassword() {
    this.dialog.open(InfoPerfilCambioPasswordComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'modal-sin-padding'
    });
  }
}
