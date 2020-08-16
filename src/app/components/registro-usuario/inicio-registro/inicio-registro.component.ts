import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TipoPersona } from '../../../enums/tipo-persona.enum';
import { MatSnackBar } from '@angular/material';
import { OnboardingUsuariosService } from '../../../services/perfiles/onboarding-usuarios.service';

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

  constructor(
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private onboardingUsuariosService: OnboardingUsuariosService
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
              console.log("enviar email")
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
}
