import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TarjetaTabContainerComponent } from '../tarjeta-tab-container/tarjeta-tab-container.component';
import { PagarCobrarContainerComponent } from '../pagar-cobrar-container/pagar-cobrar-container.component';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
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

  esCelular: boolean;
  operaciones: Operaciones[] = [];

  constructor(
    private cuentaService: CuentaAlgService,
    private ctacteAplicadaService: CtacteAplicadaService,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private billeteraService: BilleteraService
  ) { }

  ngOnInit() {
  this.authenticationService.perfilActivo$
    .pipe(takeUntil(this.destroy$));
  this.cuentaService.cuentaSeleccionada$
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      cuenta => this.cargarSaldoGlobal(cuenta.id.codigo)
    );
  this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
  this.esCelular = this.deviceService.isMobile();
  this.operaciones = this.billeteraService.getOperaciones();
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

}
