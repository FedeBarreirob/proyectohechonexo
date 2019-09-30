import { Component, OnInit } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { Subject } from 'rxjs';
import { TerceroBasico } from '../../../interfaces/acceso-terceros/tercero-basico';

@Component({
  selector: 'app-informacion-de-perfil-desktop',
  templateUrl: './informacion-de-perfil-desktop.component.html',
  styleUrls: ['./informacion-de-perfil-desktop.component.css']
})
export class InformacionDePerfilDesktopComponent implements OnInit {

  cargando: boolean;
  perfilBasico: PerfilBasico;
  nombreEntidad: string;

  modoDetalleEditPerfilDesktop: boolean = false;
  modoDetalleEditPerfilDesktop$: Subject<PerfilBasico> = new Subject<PerfilBasico>();

  modoDetalleEditTerceroDesktop: boolean = false;
  modoDetalleEditTerceroDesktop$: Subject<TerceroBasico> = new Subject<TerceroBasico>();

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
      });

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.cargarDatosCuentaSeleccionada(cuentaAlg)
    );
  }

  /**
   * Función encargada de cargar el nombre de la entidad
   * @param cuentaAlg 
   */
  cargarDatosCuentaSeleccionada(cuentaAlg: EntidadAlg) {
    if (cuentaAlg) {
      let nombreEntidadSeleccionada: string = cuentaAlg.nombre;
      this.nombreEntidad = `(${cuentaAlg.id.codigo}) ${nombreEntidadSeleccionada}`;
    } else {
      this.nombreEntidad = "";
    }
  }

  /**
   * Función encargada de mostrar el detalle de un perfil seleccionado en modo desktop
   */
  verDetalleEditPerfilDesktop() {
    this.modoDetalleEditPerfilDesktop = true;
    this.modoDetalleEditPerfilDesktop$.next(this.perfilBasico);
  }

  /**
   * Función encargada de restaurar la vista saliendo del modo detalle
   */
  salirModoDetalleEditPerfilDesktop() {
    this.modoDetalleEditPerfilDesktop = false;
  }

  /**
   * Función encargada de mostrar el detalle de un tercero seleccionado en modo desktop
   * @param tercero 
   */
  verDetalleEditTerceroDesktop(tercero: TerceroBasico) {
    this.modoDetalleEditTerceroDesktop = true;
    this.modoDetalleEditTerceroDesktop$.next(tercero);
  }

  /**
   * Función encargada de restaurar la vista saliendo del modo detalle
   */
  salirModoDetalleEditTerceroDesktop() {
    this.modoDetalleEditTerceroDesktop = false;
  }
}
