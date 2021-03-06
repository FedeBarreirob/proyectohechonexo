import { Component, OnInit } from '@angular/core';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { Subject } from 'rxjs';
import { TerceroBasico } from '../../../interfaces/acceso-terceros/tercero-basico';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { MatDialog } from '@angular/material';
import { TutorialModalComponent } from '../../common/tutorial-modal/tutorial-modal.component';
import { TutorialModalService } from '../../../services/tutorial-modal/tutorial-modal.service';

@Component({
  selector: 'app-informacion-de-perfil-desktop',
  templateUrl: './informacion-de-perfil-desktop.component.html',
  styleUrls: ['./informacion-de-perfil-desktop.component.css']
})
export class InformacionDePerfilDesktopComponent implements OnInit {

  cargando: boolean;
  cargando$: Subject<boolean> = new Subject<boolean>();

  perfilBasico: PerfilBasico;
  nombreEntidad: string;

  modoDetalleEditPerfilDesktop: boolean = false;
  modoDetalleEditPerfilDesktop$: Subject<PerfilBasico> = new Subject<PerfilBasico>();

  modoDetalleEditTerceroDesktop: boolean = false;
  modoDetalleEditTerceroDesktop$: Subject<TerceroBasico> = new Subject<TerceroBasico>();

  notificacionTerceroActualizado$: Subject<any> = new Subject<any>();

  constructor(
    private authenticationService: AuthenticationService,
    private cuentaAlgService: CuentaAlgService,
    private perfilesService: PerfilesService,
    private dialog: MatDialog,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
    if (this.authenticationService.esRol("PRODUCTOR")) {
      var currentUser = JSON.parse(localStorage.getItem('currentUserPerfil'));
      var perfilTutorial = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'perfilTutorial')[0];

      // Modal tutorial
      if (!JSON.parse(localStorage.getItem('perfilTutorial')) && !perfilTutorial.visto) {
        const dialogRef = this.dialog.open(TutorialModalComponent, {
          data: { title: perfilTutorial.contenido.title, description: perfilTutorial.contenido.description }
        });

        dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem('perfilTutorial', JSON.stringify(true));
          this.tutorialModalService.marcarVisto({
            perfilId: currentUser.informacionPersonal.id,
            key: 'perfilTutorial',
            visto: true
          }).subscribe(result => {

          });
        });
      }
    }

    this.authenticationService.perfilActivo$.subscribe(
      perfil => {
        this.perfilBasico = perfil;
      });

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.cargarDatosCuentaSeleccionada(cuentaAlg)
    );

    this.recargaDelPerfilSiEsActualizado();
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

  /**
   * Función encargada de recargar los datos del perfil
   */
  recargaDelPerfilSiEsActualizado() {
    this.cargando$.next(true);
    this.perfilesService.reCargarPerfilLogueado().subscribe(
      () => {
        this.cargando$.next(false);
      },
      () => {
        this.cargando$.next(false);
      }
    );
  }

  /**
   * Notifica que un tercero ha sido actualizado
   */
  notificarTerceroActualizado() {
    this.notificacionTerceroActualizado$.next();
  }
}
