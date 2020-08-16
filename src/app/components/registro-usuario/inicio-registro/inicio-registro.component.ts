import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TipoPersona } from '../../../enums/tipo-persona.enum';
import { MatSnackBar } from '@angular/material';
import { OnboardingUsuariosService } from '../../../services/perfiles/onboarding-usuarios.service';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { TipoEmailPlantilla } from 'src/app/enums/tipo-email-plantilla.enum';

@Component({
  selector: 'app-inicio-registro',
  templateUrl: './inicio-registro.component.html',
  styleUrls: ['./inicio-registro.component.css']
})
export class InicioRegistroComponent implements OnInit {

  profileForm: FormGroup;
  esCelular: boolean;
  tipoPersona = TipoPersona;
  registrando: boolean = false;
  notificando: boolean = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private onboardingUsuariosService: OnboardingUsuariosService,
    private router: Router,
    private notificacionesService: NotificacionesService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.inicializarFormulario();
  }

  /**
   * Inicializa los campos del formulario
   */
  inicializarFormulario() {
    this.profileForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required]],
      numDocumento: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipoPersona: [TipoPersona.PERSONA_FISICA, [Validators.required]],
      enSucesion: [false],
      cuit: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmacion: ['', [Validators.required]]
    });
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Verifica si tiene error el control dado
   */
  public errorHandling = (control: string, error: string) => {
    return this.profileForm.controls[control].hasError(error) && (this.profileForm.controls[control].touched || this.profileForm.controls[control].dirty);
  }

  /**
   * Inicia el proceso de registro
   */
  registrar() {
    if (this.registrando == false) {
      this.registrando = true;

      this.onboardingUsuariosService.registrar(this.profileForm.value)
        .subscribe(
          respuesta => {
            if (respuesta.exito) {
              this.enviarEmail();
            } else {
              this.openSnackBar(respuesta.mensaje);
            }
          },
          error => {
            console.log(error);
            this.registrando = false;
          },
          () => this.registrando = false
        );
    }
  }

  /**
   * Indica, si esa opción se puede seleccionar
   */
  get enSucesionSeleccionable() {
    if (this.profileForm.value.tipoPersona == TipoPersona.PERSONA_FISICA) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Envia email para validar el mail
   */
  enviarEmail() {
    if (this.notificando == false) {
      this.notificando = true;

      let emailAEnviar = {
        tipo: TipoEmailPlantilla.ALTA_USUARIO_VERIFICACION_EMAIL,
        destinos: [this.profileForm.value.email],
        campos: [
          {
            tag: "nombre",
            value: this.profileForm.value.nombreCompleto
          },
          {
            tag: "link",
            value: "http://gavigliodigitaltest.eastus.cloudapp.azure.com/"
          }
        ]
      }

      this.notificacionesService.enviarEmailConPlantilla(emailAEnviar)
        .subscribe(
          respuesta => {
            if (respuesta.exito) {
              let url = `confirmacion-mail/${this.profileForm.value.email}`;
              this.router.navigate([url]);
            } else {
              this.openSnackBar(respuesta.mensaje);
            }
          },
          error => {
            console.log(error);
            this.notificando = false;
          },
          () => this.notificando = false
        );
    }
  }
}
