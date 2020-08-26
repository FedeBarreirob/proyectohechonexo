import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanzasOnboardingClientesService } from '../../../../services/finanzas/finanzas-onboarding-clientes.service';
import { Subject } from 'rxjs';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-responda-preguntas',
  templateUrl: './responda-preguntas.component.html',
  styleUrls: ['./responda-preguntas.component.css']
})
export class RespondaPreguntasComponent implements OnInit, OnDestroy {

  perfil: PerfilBasico;
  formulario: any;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;

  constructor(
    private finanzasOnboardingClientesService: FinanzasOnboardingClientesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.perfil = this.authenticationService.perfilUsuarioSeleccionado();
    this.cargarFormulario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Cargar las preguntas y respuestas 
   */
  cargarFormulario() {
    if (this.cargando == false && this.perfil) {

      this.cargando = true;

      this.finanzasOnboardingClientesService.formularioInformacion(this.perfil.informacionPersonal.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.formulario = respuesta.datos
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );

    }
  }
}
