import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserAuth } from '../../../models/security/user';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';
import { TutorialModalComponent } from '../../../components/common/tutorial-modal/tutorial-modal.component';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { takeUntil } from 'rxjs/operators';
import { window } from 'rxjs/internal/operators/window';
import { TutorialModalService } from '../../../services/tutorial-modal/tutorial-modal.service';
import { MensajeBienvenidaDialogComponent } from '../mensaje-bienvenida-dialog/mensaje-bienvenida-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('menuNotificaciones') public sidenav: MatSidenav;

  cargando$: Subject<boolean> = new Subject<boolean>();
  cargandoCtacte: boolean = false;
  cargandoIndicadorContratos: boolean = false;
  cargandoIndicadorEntregasRecientes: boolean = false;
  cargandoIndicadorVentasRecientes: boolean = false;
  esCelular: boolean;
  hayNotificacionesNuevas: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  perfilBasico: PerfilBasico;

  constructor(
    private deviceService: DeviceDetectorService,
    private notificacionService: NotificacionesService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private perfilService: PerfilesService,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
    if (this.authenticationService.esRol("PRODUCTOR")) {
      var currentUser = JSON.parse(localStorage.getItem('currentUserPerfil'));
      var welcomeTutorial1_2 = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'welcomeTutorial1-2')[0];

      // Modal tutorial bienvenida 1/2
      if (!JSON.parse(localStorage.getItem('welcomeTutorial1-2')) && !welcomeTutorial1_2.visto) {
        const dialogRef = this.dialog.open(TutorialModalComponent, {
          data: { buttonText: welcomeTutorial1_2.contenido.buttonText, title: welcomeTutorial1_2.contenido.title, description: welcomeTutorial1_2.contenido.description, pageId: welcomeTutorial1_2.contenido.pageId, pageCount: welcomeTutorial1_2.contenido.pageCount }
        });

        dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem('welcomeTutorial1-2', JSON.stringify(true));
          this.tutorialModalService.marcarVisto({
            perfilId: currentUser.informacionPersonal.id,
            key: 'welcomeTutorial1-2',
            visto: true
          }).subscribe(result => {

          });

          var welcomeTutorial2_2 = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'welcomeTutorial2-2')[0];

          // Modal tutorial bienvenida 2/2
          if (!JSON.parse(localStorage.getItem('welcomeTutorial2-2')) && !welcomeTutorial2_2.visto) {
            const dialogRef2 = this.dialog.open(TutorialModalComponent, {
              data: { buttonText: welcomeTutorial2_2.contenido.buttonText, title: welcomeTutorial2_2.contenido.title, description: welcomeTutorial2_2.contenido.description, description2: welcomeTutorial2_2.contenido.description2, userName: welcomeTutorial2_2.contenido.userName, pageId: welcomeTutorial2_2.contenido.pageId, pageCount: welcomeTutorial2_2.contenido.pageCount }
            });

            dialogRef2.afterClosed().subscribe(userName => {
              localStorage.setItem('welcomeTutorial2-2', JSON.stringify(true));
              this.tutorialModalService.marcarVisto({
                perfilId: currentUser.informacionPersonal.id,
                key: 'welcomeTutorial2-2',
                visto: true
              }).subscribe(result => {

              });;

              if (userName) {
                currentUser.informacionPersonal.nombre = userName;
                this.perfilService.actualizarDatosPersonales(currentUser).subscribe(response => { this.authenticationService.setPerfilActivo(currentUser); });
              }

              var homeTutorial = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'homeTutorial')[0];

              // Modal tutorial
              if (!JSON.parse(localStorage.getItem('homeTutorial')) && !homeTutorial.visto) {
                const dialogRef3 = this.dialog.open(TutorialModalComponent, {
                  data: {
                    title: homeTutorial.contenido.title,
                    description: homeTutorial.contenido.description,
                    listItems: homeTutorial.contenido.listItems
                  }
                });

                dialogRef3.afterClosed().subscribe(result => {
                  localStorage.setItem('homeTutorial', JSON.stringify(true));
                  this.tutorialModalService.marcarVisto({
                    perfilId: currentUser.informacionPersonal.id,
                    key: 'homeTutorial',
                    visto: true
                  }).subscribe(result => {

                  });;
                });
              }
            });
          }
        });
      }
    }

    this.esCelular = this.deviceService.isMobile();

    if (this.esCelular) {
      this.actualizarIndicadorMensajes();
      this.notificacionService.huboCambiosEstadoMensajes$.subscribe(respuesta => this.actualizarIndicadorMensajes());
    }
  }

  /**
   * Funcion encargada de mostrar u ocultar el sidebar que contiene las notificaciones
   */
  mostrarOcultarNotificaciones() {
    this.sidenav.toggle();
  }

  /**
   * Indica el estado de carga del indicador de Cuenta corriente
   * @param cargando Indica estado de carga
   */
  esCargandoCtaCte(cargando: boolean) {
    this.cargandoCtacte = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Contratos
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorContratos(cargando: boolean) {
    this.cargandoIndicadorContratos = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Entregas recientes
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorEntregasRecientes(cargando: boolean) {
    this.cargandoIndicadorEntregasRecientes = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Ventas recientes
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorVentasRecientes(cargando: boolean) {
    this.cargandoIndicadorVentasRecientes = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Muestra el indicador de carga mientras haya un proceso ejecutándose
   */
  private mostrarIndicadorLoading() {

    let hayProcesosEnEjecucion = this.cargandoCtacte == true ||
      this.cargandoIndicadorContratos == true || this.cargandoIndicadorEntregasRecientes == true
      || this.cargandoIndicadorVentasRecientes == true;

    if (hayProcesosEnEjecucion == true) {
      this.cargando$.next(true);
    } else {
      this.cargando$.next(false);
    }
  }

  /**
   * Verifica si hay mensajes y cambia el ícono si corresponde
   */
  actualizarIndicadorMensajes() {
    let perfil = this.authenticationService.perfilUsuarioSeleccionado();
    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null && perfil != null) {

      this.notificacionService.cantidadMensajesEnEstadoIndicado(
        perfil.informacionPersonal.id,
        EstadoNotificaciones.NO_LEIDO)
        .subscribe(respuesta => {

          if (respuesta.exito) {
            let cantidadMensajes: number = respuesta.datos;
            if (cantidadMensajes > 0) {
              this.hayNotificacionesNuevas = true;
            } else {
              this.hayNotificacionesNuevas = false;
            }
          }

        }, error => console.log(error));
    }
  }
}
