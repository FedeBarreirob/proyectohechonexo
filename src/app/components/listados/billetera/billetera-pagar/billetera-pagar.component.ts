import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { MatSidenav } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';

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
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private deviceService: DeviceDetectorService,
    private cuentaService: CuentaAlgService,
    private authenticationService: AuthenticationService
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

}
