import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
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

import { TarjetaTabContainerComponent } from '../tarjeta-tab-container/tarjeta-tab-container.component';
import { PagarCobrarContainerComponent } from '../pagar-cobrar-container/pagar-cobrar-container.component';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { DetalleCuenta, BilleteraService, Operaciones } from '../../../../services/billetera/billetera.service';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.component.html',
  styleUrls: ['./billetera.component.css']
})
export class BilleteraComponent implements OnInit, OnDestroy {

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  saldoGlobal: SaldoGlobalCtaCteAplicada;
  cargando = false;
  destroy$: Subject<any> = new Subject<any>();
  seObtuvoSaldoExito = false;

  @ViewChild('menuNotificaciones') public sidenav: MatSidenav;

  cargando$: Subject<boolean> = new Subject<boolean>();
  cargandoCtacte = false;
  cargandoIndicadorContratos = false;
  cargandoIndicadorEntregasRecientes = false;
  cargandoIndicadorVentasRecientes = false;
  esCelular: boolean;
  hayNotificacionesNuevas = false;
  operaciones: Operaciones[] = [];

  constructor(
    private cuentaService: CuentaAlgService,
    private ctacteAplicadaService: CtacteAplicadaService,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private billeteraService: BilleteraService,
    private notificacionService: NotificacionesService,
    private dialog: MatDialog,
    private perfilService: PerfilesService,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
    /*this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$));
    this.cuentaService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => this.cargarSaldoGlobal(cuenta.id.codigo)
      );
    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());*/
    this.esCelular = this.deviceService.isMobile();
    /*if (this.esCelular) {
      this.actualizarIndicadorMensajes();
      this.notificacionService.huboCambiosEstadoMensajes$.subscribe(respuesta => this.actualizarIndicadorMensajes());
    }
    this.operaciones = this.billeteraService.getOperaciones();*/
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga los saldos globales de la cta cte aplicada
   * @param cuenta Identificación del productor
   */
  cargarSaldoGlobal(cuenta: string) {
    if (this.cargando === false) {

      this.cargando = true;
      this.cargandoChange.emit(true);

      this.ctacteAplicadaService.saldoGlobal(cuenta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito === true) {
              this.saldoGlobal = respuesta.datos;
              this.seObtuvoSaldoExito = true;
            } else {
              this.seObtuvoSaldoExito = false;
            }

            this.cargando = false;
            this.cargandoChange.emit(false);
          },
          error => {
            console.log(error);
            this.cargando = false;
            this.cargandoChange.emit(false);
          }
        );
    }
  }

  get operacion(): Array<any> {
    return this.operaciones;
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
