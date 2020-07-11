import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ResumenComprobanteDialogComponent } from './resumen/resumen-comprobante-dialog/resumen-comprobante-dialog.component';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FinanzasProgramadorPagosService } from '../../../../services/finanzas/finanzas-programador-pagos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billetera-pagar',
  templateUrl: './billetera-pagar.component.html',
  styleUrls: ['./billetera-pagar.component.css']
})
export class BilleteraPagarComponent implements OnInit, OnDestroy {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

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

  constructor(
    private deviceService: DeviceDetectorService,
    private cuentaService: CuentaAlgService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private finanzasProgramadorPagosService: FinanzasProgramadorPagosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarUnidadMedida()
        });

    this.cargarUnidadMedida();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion que carga la unidad de medida desde el perfil 
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = (this.perfilBasico.informacionPersonal.unidadMedidaPeso) ? this.perfilBasico.informacionPersonal.unidadMedidaPeso : 'tn';
    } else {
      this.perfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
      this.unidadMedida = (this.perfilBasico.informacionPersonal.unidadMedidaPeso) ? this.perfilBasico.informacionPersonal.unidadMedidaPeso : 'tn';
    }
  }

  // Muestra el comprobante en un dialog
  mostrarComprobante() {
    let dialogRef = this.dialog.open(ResumenComprobanteDialogComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%',
    })
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

      this.finanzasProgramadorPagosService.registroSolicitudDePago(datos)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.openSnackBar(respuesta.mensaje);

            if (respuesta.exito == true) {
              this.router.navigate(["billetera"]);
            }
          },
          error => {
            console.log(error);
            this.guardando = false;
          },
          () => this.guardando = false
        );
    }
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
        return {
          especieCodExterno: unDisponible.especieCodigo,
          kgAFijar: Number.parseFloat(unDisponible.stockAFijar), //TODO: convertir la cantidad a kilos
          kgAPesificar: Number.parseFloat(unDisponible.stockAPesificar),//TODO: convertir la cantidad a kilos
        }
      });
    }

    let datos = {
      cuenta: this.cuenta.id.codigo,
      medioPago: 1, // por ahora se fuerza a que sea canje
      conceptosAPagar: this.conceptosAPagarSeleccionados$.getValue(),
      canjes
    };

    return datos;
  }
}
