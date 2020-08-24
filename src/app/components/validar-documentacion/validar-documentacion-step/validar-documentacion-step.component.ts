import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FrenteDniComponent } from '../frente-dni/frente-dni.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SelfieComponent } from '../selfie/selfie.component';
import { DorsoDniComponent } from '../dorso-dni/dorso-dni.component';
import { ValidacionIdentidadData } from '../../../interfaces/perfiles/validacion-identidad-data';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { SituacionUsuarioComponent } from '../situacion-usuario/situacion-usuario.component';
import { OnboardingUsuariosService } from '../../../services/perfiles/onboarding-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validar-documentacion-step',
  templateUrl: './validar-documentacion-step.component.html',
  styleUrls: ['./validar-documentacion-step.component.css']
})
export class ValidarDocumentacionStepComponent implements OnInit {

  esCelular: boolean;
  datosAValidar: ValidacionIdentidadData;

  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private onboardingUsuariosService: OnboardingUsuariosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.inicializarDatosAValidar();
  }

  inicializarDatosAValidar() {
    let perfil: PerfilBasico = this.authenticationService.perfilUsuarioLogueado();

    this.datosAValidar = {
      perfilId: perfil.informacionPersonal.id
    }
  }

  sacarFotoFrente() {
    let dialogRef = this.dialog.open(FrenteDniComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(
      img => {
        this.datosAValidar.frente = img;
      }
    );
  }

  sacarFotoDorso() {
    let dialogRef = this.dialog.open(DorsoDniComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(
      img => {
        this.datosAValidar.dorso = img;
      }
    );
  }

  sacarFotoSelfie() {
    let dialogRef = this.dialog.open(SelfieComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(
      img => {
        this.datosAValidar.sosteniendoDNI = img;

        this.obtenerSituacionUsuario();
      }
    );
  }

  obtenerSituacionUsuario() {
    let dialogRef = this.dialog.open(SituacionUsuarioComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(
      () => this.registrarDatosDeValidacion()
    );
  }

  registrarDatosDeValidacion() {
    this.onboardingUsuariosService.validarIdentidad(this.datosAValidar)
      .subscribe(
        respuesta => {
          if (respuesta.exito) {
            this.router.navigate(["/situacion-completada"]);
          } else {
            this.openSnackBar(respuesta.mensaje);
          }

        }
      );
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
}
