import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { MatSidenav, MatDialog, MatSnackBar, MatHorizontalStepper } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ResumenComprobanteDialogComponent } from './resumen/resumen-comprobante-dialog/resumen-comprobante-dialog.component';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FinanzasProgramadorPagosService } from '../../../../services/finanzas/finanzas-programador-pagos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NumeroAKilosPipe } from '../../../../pipes/numero-akilos.pipe';

@Component({
  selector: 'app-billetera-pagar',
  templateUrl: './billetera-pagar.component.html',
  styleUrls: ['./billetera-pagar.component.css'],
  providers: [NumeroAKilosPipe]
})
export class BilleteraPagarComponent implements OnInit, OnDestroy {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;
  @ViewChild('stepper') stepper: MatHorizontalStepper;

  destroy$: Subject<any> = new Subject<any>();
  esCelular: boolean;
  cuenta: EntidadAlg;
  totalEvent$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  observerFiltro$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  conceptosAPagarSeleccionados$: BehaviorSubject<Array<MovimientoCtaCteAplicada>> = new BehaviorSubject<Array<MovimientoCtaCteAplicada>>(null);
  disponiblesSeleccionados$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  unidadMedida: string;
  perfilBasico: PerfilBasico;
  guardando: boolean = false;

  solicitudDePagoEnEdicion: any;
  cargando: boolean = false;
  modoEdicion: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private cuentaService: CuentaAlgService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private finanzasProgramadorPagosService: FinanzasProgramadorPagosService,
    private router: Router,
    private numeroAKilosPipe: NumeroAKilosPipe,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.perfilBasico = this.authenticationService.perfilUsuarioLogueado();
    this.cargarUnidadMedida();

    this.activatedRouter.params.subscribe(params => {
      if (params.solicitudId) {
        this.modoEdicion = true;
        this.cargarSolicitudDePagoAEditar(params.solicitudId);

      } else {

        this.modoEdicion = false;
        this.cuentaService.cuentaAlgSeleccionadaV2$.asObservable()
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            cuenta => {
              this.cuenta = cuenta;
              this.cargarListadoPorDefecto();
            }
          );

        if (this.cuentaService.cuentaAlgSeleccionadaV2$.getValue()) {
          this.cuenta = this.cuentaService.cuentaAlgSeleccionadaV2$.getValue();
          this.cargarListadoPorDefecto();
        }

      }
    });

    // observer de perfil
    /* this.authenticationService.perfilActivo$
       .pipe(takeUntil(this.destroy$))
       .subscribe(
         perfil => {
           this.perfilBasico = perfil;
           this.cargarUnidadMedida()
         });*/
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    //if (this.perfilBasico) {
    this.unidadMedida = (this.perfilBasico.informacionPersonal.unidadMedidaPeso) ? this.perfilBasico.informacionPersonal.unidadMedidaPeso : 'tn';

    /*} else {
      this.perfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
      this.unidadMedida = (this.perfilBasico.informacionPersonal.unidadMedidaPeso) ? this.perfilBasico.informacionPersonal.unidadMedidaPeso : 'tn';
    }*/
  }

  /**
   * Muestra el resumen de la solicitud de pago
   * @param solicitudCreada 
   */
  mostrarResumen(solicitudCreada: any) {
    let dialogRef = this.dialog.open(ResumenComprobanteDialogComponent, {
      data: {
        solicitudCreada,
        unidadMedida: this.unidadMedida,
        total: this.totalEvent$.getValue()
      },
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%',
    });

    dialogRef.afterClosed().subscribe((nuevoCobro: boolean) => {
      if (this.modoEdicion == true) {
        this.router.navigate(["/gestion-de-solicitudes"]);
      } else {
        if (nuevoCobro == true) {
          this.resetearParaNuevoIngreso();
        } else {
          this.router.navigate(["billetera"]);
        }
      }
    });
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que ejecuta la carga del listado de entregas
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  /**
   * Arma un filtro por defecto y ejecuta el listado
   */
  cargarListadoPorDefecto() {
    let filtro = {
      cuenta: this.cuenta.id.codigo,
      aPagar: true
    }

    this.cargarListado(filtro);
  }

  /**
   * Función encargada de guardar la solicitud de pago
   */
  guardar() {
    if (this.guardando == false) {
      this.guardando = true;

      let datos = this.datosAGuardar();

      if (this.modoEdicion == true) {
        this.actualizar(datos);
      } else {
        this.registrar(datos);
      }
    }
  }

  registrar(datos: any) {
    this.finanzasProgramadorPagosService.registroSolicitudDePago(datos)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.mostrarResumen(respuesta.datos);
          } else {
            this.openSnackBar(respuesta.mensaje);
          }
        },
        error => {
          console.log(error);
          this.guardando = false;
        },
        () => this.guardando = false
      );
  }

  actualizar(datos: any) {
    this.finanzasProgramadorPagosService.actualizacionSolicitudDePago(datos)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.mostrarResumen(respuesta.datos);
          } else {
            this.openSnackBar(respuesta.mensaje);
          }
        },
        error => {
          console.log(error);
          this.guardando = false;
        },
        () => this.guardando = false
      );
  }

  /**
   * Muestra una notificacion
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Armar una estructura con los datos a registrar a través del servicio
   */
  datosAGuardar(): any {

    let canjes;
    if (this.disponiblesSeleccionados$ && this.disponiblesSeleccionados$.getValue() && this.disponiblesSeleccionados$.getValue().length > 0) {

      canjes = this.disponiblesSeleccionados$.getValue().map(unDisponible => {

        let boletosAFijar;
        if (unDisponible.definicionDeBoletosFijaciones && unDisponible.definicionDeBoletosFijaciones.length > 0) {
          boletosAFijar = unDisponible.definicionDeBoletosFijaciones.map(fijacion => {
            return {
              codContratoExterno: fijacion.boleto.contratoAlgId,
              tipoFijacion: fijacion.tipoFijacion,
              tipoPrecioFijacion: fijacion.tipoPrecioFijacion,
              kgAFijar: this.numeroAKilosPipe.transform(Number.parseFloat(fijacion.stockAFijar), this.unidadMedida),
              precioDelDia: fijacion.precioDelDia
            };
          });
        }

        let boletosAPesificar;
        if (unDisponible.definicionDeBoletosPesificacion && unDisponible.definicionDeBoletosPesificacion.length > 0) {
          boletosAPesificar = unDisponible.definicionDeBoletosPesificacion.map(pesificacion => {
            return {
              codContratoExterno: pesificacion.boleto.contratoAlgId,
              tipoPesificacion: pesificacion.tipoPesificacion,
              kgAPesificar: this.numeroAKilosPipe.transform(Number.parseFloat(pesificacion.stockAPesificar), this.unidadMedida)
            };
          });
        }

        return {
          especieCodExterno: unDisponible.especieCodigo,
          kgAFijar: this.numeroAKilosPipe.transform(Number.parseFloat(unDisponible.stockAFijar), this.unidadMedida),
          kgAPesificar: this.numeroAKilosPipe.transform(Number.parseFloat(unDisponible.stockAPesificar), this.unidadMedida),
          boletosAFijar,
          boletosAPesificar
        }
      });
    }

    let datos: any = {
      cuenta: this.cuenta.id.codigo,
      medioPago: 1, // por ahora se fuerza a que sea canje
      conceptosAPagar: this.conceptosAPagarSeleccionados$.getValue(),
      canjes
    };

    if (this.modoEdicion == true) {
      datos.id = this.solicitudDePagoEnEdicion.id;
    }

    return datos;
  }

  /**
   * Limpia todo para nuevo pago
   */
  resetearParaNuevoIngreso() {
    this.observerFiltro$.next(null);
    this.cargarListadoPorDefecto();
    this.conceptosAPagarSeleccionados$.next(null);
    this.disponiblesSeleccionados$.next(null);
    this.stepper.selectedIndex = 0;
  }

  /**
   * Función encargada de cargar los datos de una solicitud a editar
   * @param solicitudId 
   */
  cargarSolicitudDePagoAEditar(solicitudId: number) {
    if (this.cargando == false) {

      this.cargando = true;

      this.finanzasProgramadorPagosService.solicitudDePagoPorId(solicitudId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {

              this.solicitudDePagoEnEdicion = respuesta.datos;
              this.cargarCuentaDesdeSolicitudAEditar();
              this.cargarListadoPorDefecto();
              this.stepper.selectedIndex = 2;
              
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );

    }
  }

  /**
   * Carga la cuenta que se encuentra  en la solicitd de pago a editar
   */
  cargarCuentaDesdeSolicitudAEditar() {
    this.cuenta = {
      id: {
        codigo: this.solicitudDePagoEnEdicion.cuenta
      }
    }
  }


  /**
   * Devuelve la url de retorno
   */
  get backUrl(): string {
    if (this.modoEdicion == true) {
      return "/gestion-de-solicitudes";
    } else {
      return "/billetera";
    }
  }
}
