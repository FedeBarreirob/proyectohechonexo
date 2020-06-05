import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { NotificacionesService } from '../../../../services/notificaciones/notificaciones.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { UserAuth } from '../../../../models/security/user';
import { EstadoNotificaciones } from '../../../../enums/estado-notificaciones.enum';
import { PerfilesService } from '../../../../services/perfiles/perfiles.service';
import { takeUntil } from 'rxjs/operators';
import { window } from 'rxjs/internal/operators/window';
import { TutorialModalService } from '../../../../services/tutorial-modal/tutorial-modal.service';


@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.component.html',
  styleUrls: ['./billetera.component.css']
})
export class BilleteraComponent implements OnInit {

  @ViewChild('menuNotificaciones') public sidenav: MatSidenav;

  cargando$: Subject<boolean> = new Subject<boolean>();
  cargandoCtacte: boolean = false;
  cargandoIndicadorContratos: boolean = false;
  cargandoIndicadorEntregasRecientes: boolean = false;
  cargandoIndicadorVentasRecientes: boolean = false;
  esCelular: boolean;
  hayNotificacionesNuevas: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private deviceService: DeviceDetectorService,
    private notificacionService: NotificacionesService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private perfilService: PerfilesService,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
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

    let hayProcesosEnEjecucion = this.cargandoCtacte === true ||
      this.cargandoIndicadorContratos === true || this.cargandoIndicadorEntregasRecientes === true
      || this.cargandoIndicadorVentasRecientes === true;

    if (hayProcesosEnEjecucion === true) {
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
