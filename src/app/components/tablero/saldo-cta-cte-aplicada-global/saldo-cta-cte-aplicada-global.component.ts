import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { SaldoGlobalCtaCteAplicada } from '../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';

@Component({
  selector: 'app-saldo-cta-cte-aplicada-global',
  templateUrl: './saldo-cta-cte-aplicada-global.component.html',
  styleUrls: ['./saldo-cta-cte-aplicada-global.component.css']
})
export class SaldoCtaCteAplicadaGlobalComponent implements OnInit, OnDestroy {

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  saldoGlobal: SaldoGlobalCtaCteAplicada;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  seObtuvoSaldoExito: boolean;
  esCelular: boolean;
  nombre: string;
  perfilBasico: PerfilBasico;

  constructor(
    private cuentaService: CuentaAlgService,
    private ctacteAplicadaService: CtacteAplicadaService,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarNombreUsuario();
        });

    this.esCelular = this.deviceService.isMobile();

    this.cuentaService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => this.cargarSaldoGlobal(cuenta.id.codigo)
      );

    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
    this.cargarNombreUsuario();
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
    if (this.cargando == false) {

      this.cargando = true;
      this.cargandoChange.emit(true);

      this.ctacteAplicadaService.saldoGlobal(cuenta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
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

  /**
   * funcion encargada de cargar el nombre del usuario
   */
  cargarNombreUsuario() {
    if (this.perfilBasico && this.perfilBasico.informacionPersonal && this.perfilBasico.informacionPersonal.nombre) {
      this.nombre = this.perfilBasico.informacionPersonal.nombre;
    } else {
      this.nombre = "-";
    }
  }
}
