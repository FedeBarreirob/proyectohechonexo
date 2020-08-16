import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CircleProgressComponent } from 'ng-circle-progress';
import { IndicadorCargaLegajo } from '../../../interfaces/legajo/indicador-carga-legajo';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { FileStorageService } from '../../../services/file-storage/file-storage.service';
import { Subject } from 'rxjs';
import { GrupoDeDocumentaciones } from '../../../enums/grupo-de-documentaciones.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-completar-documentacion-card',
  templateUrl: './completar-documentacion-card.component.html',
  styleUrls: ['./completar-documentacion-card.component.css']
})
export class CompletarDocumentacionCardComponent implements OnInit, OnDestroy {

  indicador: IndicadorCargaLegajo;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private fileStorageService: FileStorageService
  ) { }

  ngOnInit() {
    this.authenticationService._perfilActivo$.subscribe(
      perfil => {
        this.cargarIndicador(perfil);
      }
    );

    let perfil: PerfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
    this.cargarIndicador(perfil);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga ls información de carga del legajo
   */
  cargarIndicador(perfil: PerfilBasico) {
    if (perfil && this.cargando == false) {

      this.cargando = true;

      this.fileStorageService.avanceDeCarga(perfil.informacionPersonal.id, GrupoDeDocumentaciones.ALTA_LEGAJO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.indicador = respuesta.datos;
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );

    } else {
      this.indicador = null;
    }
  }

  get documentosFaltantes(): number {
    if (this.indicador) {
      return this.indicador.totalDocumentacionACompletar - this.indicador.cantDocumentacionCompletada;
    } else {
      return null;
    }
  }
}
