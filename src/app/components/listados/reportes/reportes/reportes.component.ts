import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog, PageEvent, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { TutorialModalComponent } from '../../../common/tutorial-modal/tutorial-modal.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { TutorialModalService } from '../../../../services/tutorial-modal/tutorial-modal.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, AfterViewInit {

  cuenta: EntidadAlg;
  esCelular: boolean;

  constructor(
    private cuentasService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private tutorialModalService: TutorialModalService
  ) { }

  ngOnInit() {
    if (this.authenticationService.esRol("PRODUCTOR")) {
      var currentUser = JSON.parse(localStorage.getItem('currentUserPerfil'));
      var reportesTutorial = currentUser.tutorialModales.filter(tutorial => tutorial.key == 'reportesTutorial')[0];

      // Modal tutorial
      if (!JSON.parse(localStorage.getItem('reportesTutorial')) && !reportesTutorial.visto) {
        const dialogRef = this.dialog.open(TutorialModalComponent, {
          data: { title: reportesTutorial.contenido.title, description: reportesTutorial.contenido.description }
        });

        dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem('reportesTutorial', JSON.stringify(true));
          this.tutorialModalService.marcarVisto({
            perfilId: currentUser.informacionPersonal.id,
            key: 'reportesTutorial',
            visto: true
          }).subscribe(result => {

          });
        });
      }
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
}
