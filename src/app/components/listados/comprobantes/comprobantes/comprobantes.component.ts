import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FiltroComprobanteDescarga } from '../../../../interfaces/archivo-de-comprobantes/filtro-comprobante-descarga';
import { TutorialModalComponent } from '../../../common/tutorial-modal/tutorial-modal.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { TutorialModalService } from '../../../../services/tutorial-modal/tutorial-modal.service';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css']
})
export class ComprobantesComponent implements OnInit, AfterViewInit {

  @ViewChild('menuFiltro')
  sidenav: MatSidenav;

  cuenta: EntidadAlg;
  filtroArchivosComprobantes$: Subject<FiltroComprobanteDescarga> = new Subject<FiltroComprobanteDescarga>();
  esCelular: boolean;

  constructor(
    private cuentasService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUserPerfil'));
    var comprobantesTutorial = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'comprobantesTutorial')[0];

    // Modal tutorial
    if (this.authenticationService.esRol("PRODUCTOR") && !JSON.parse(localStorage.getItem('comprobantesTutorial')) && !comprobantesTutorial.visto) {
      const dialogRef = this.dialog.open(TutorialModalComponent, {
        data: { title: comprobantesTutorial.contenido.title, description: comprobantesTutorial.contenido.description }
      });

      dialogRef.afterClosed().subscribe(result => {
        localStorage.setItem('comprobantesTutorial', JSON.stringify(true));
        this.tutorialModalService.marcarVisto({
          perfilId: currentUser.informacionPersonal.id,
          key: 'comprobantesTutorial',
          visto: true
        }).subscribe(result => {

        });
      });
    }

    this.esCelular = this.deviceService.isMobile();

    this.cuentasService.cuentaSeleccionada$.subscribe(
      cuenta => this.cuenta = cuenta
    );
  }

  ngAfterViewInit(): void {
    if (this.cuentasService.cuentaPreviamenteSeleccionada && !this.esCelular) {
      this.cuenta = this.cuentasService.cuentaPreviamenteSeleccionada;
    }
  }

  /**
   * Muestra u oculta el panel de filtros
   */
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  /**
   * Notifica que se debe cargar el listado de comprobantes a descargar
   * @param filtro Filtro para la busqueda de comprobantes
   */
  cargarListadoArchivosComprobantes(filtro: FiltroComprobanteDescarga) {
    this.filtroArchivosComprobantes$.next(filtro);
  }
}
