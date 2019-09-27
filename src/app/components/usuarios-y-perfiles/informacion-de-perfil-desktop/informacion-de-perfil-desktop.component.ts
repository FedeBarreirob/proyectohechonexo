import { Component, OnInit } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';

@Component({
  selector: 'app-informacion-de-perfil-desktop',
  templateUrl: './informacion-de-perfil-desktop.component.html',
  styleUrls: ['./informacion-de-perfil-desktop.component.css']
})
export class InformacionDePerfilDesktopComponent implements OnInit {

  cargando: boolean;
  perfilBasico: PerfilBasico;
  nombreEntidad: string;

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
}