import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit, OnDestroy {

  @Input()
  modoParaToolbar: boolean = false;

  perfilBasico: PerfilBasico;
  nombre: string;
  nombreEntidad: string;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarNombreUsuario();
        });

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.cargarDatosCuentaSeleccionada(cuentaAlg)
    );

    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
    this.cargarNombreUsuario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar los datos del perfil junto al avatar
  cargarNombreUsuario() {
    if (this.perfilBasico && this.perfilBasico.informacionPersonal && this.perfilBasico.informacionPersonal.nombre) {
      this.nombre = this.perfilBasico.informacionPersonal.nombre;
    } else {
      this.nombre = "-";
    }
  }

  // funcion encargada de cargar el nombre de la entidad
  cargarDatosCuentaSeleccionada(cuentaAlg: EntidadAlg) {
    if (cuentaAlg) {
      let nombreEntidadSeleccionada: string = cuentaAlg.nombre;
      this.nombreEntidad = `(${cuentaAlg.id.codigo}) ${nombreEntidadSeleccionada}`;
    } else {
      this.nombreEntidad = "";
    }
  }
}
