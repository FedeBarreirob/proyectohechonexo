import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserAuth } from '../../../models/security/user';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';
import { TutorialModalComponent } from '../../../components/common/tutorial-modal/tutorial-modal.component';

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

  constructor(
    private deviceService: DeviceDetectorService,
    private notificacionService: NotificacionesService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Modal tutorial bienvenida 1/2
    if (!this.authenticationService.esAdmin && !JSON.parse(localStorage.getItem('welcomeTutorial'))) {
      const dialogRef = this.dialog.open(TutorialModalComponent, {
        data: { buttonText: 'OK!', title: '¡Bienvenido a Gaviglio Digital! 1/2', description: 'Ya puedes acceder a toda la información de tu cuenta de manera sencilla y ágil, en cualquier momento o lugar, desde tu celular o tu computadora.' }
      });

      dialogRef.afterClosed().subscribe(result => {
        // Modal tutorial bienvenida 2/2
        const dialogRef2 = this.dialog.open(TutorialModalComponent, {
          data: { buttonText: 'Adelante!', title: '¡Bienvenido a Gaviglio Digital! 2/2', description: 'Escribe tu nombre para personalizar tu experiencia:', description2: 'Recuerda que puedes editarlo también en la sección Perfil.', userName: ' ' }
        });

        dialogRef2.afterClosed().subscribe(result => {
          localStorage.setItem('welcomeTutorial', JSON.stringify(true));

          // Modal tutorial
          if (!this.authenticationService.esAdmin && !JSON.parse(localStorage.getItem('homeTutorial'))) {
            const dialogRef3 = this.dialog.open(TutorialModalComponent, {
              data: {
                title: 'Inicio',
                description: 'En esta sección encontrarás un resumen rápido de:',
                listItems: ['Cuánto dinero disponés para cobrar o pagar en todo concepto, contemplando el tipo de cambio correspondiente a la fecha',
                  'Cuánto grano entregado o pendiente de entrega',
                  'Cuánto grano vendido o pendiente de fijar, pesificar o liquidar',
                  'Las últimas entregas y ventas realizadas']
              }
            });

            dialogRef3.afterClosed().subscribe(result => {
              localStorage.setItem('homeTutorial', JSON.stringify(true));
            });
          }
        });
      });
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
