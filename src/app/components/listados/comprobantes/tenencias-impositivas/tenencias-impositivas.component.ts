import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InformacionTributariaService } from '../../../../services/informacion-tributaria/informacion-tributaria.service';
import { InformacionTributariaExportacionesService } from '../../../../services/informacion-tributaria/informacion-tributaria-exportaciones.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TenenciaImpositiva } from '../../../../interfaces/informacion-tributaria/tenencia-impositiva/tenencia-impositiva';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';

@Component({
  selector: 'app-tenencias-impositivas',
  templateUrl: './tenencias-impositivas.component.html',
  styleUrls: ['./tenencias-impositivas.component.css'],
  providers: [DatePipe]
})
export class TenenciasImpositivasComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: string;

  fecha: string;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  cargando$: Subject<boolean> = new Subject<boolean>();
  tenenciaImpositiva: TenenciaImpositiva = null;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private informacionTributariaService: InformacionTributariaService,
    private informacionTributariaExpService: InformacionTributariaExportacionesService,
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.fecha = (new Date()).toISOString();

    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarUnidadMedida()
        });

    this.cargarUnidadMedida();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que carga la unidad de medida desde el perfil
   */
  cargarUnidadMedida() {
    if (this.perfilBasico) {
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    } else {
      this.perfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
      this.unidadMedida = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  /**
   * Función encargada de generar el reporte de tenencias impositivas
   */
  generar() {
    if (this.cargando == false) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaFiltro = (this.fecha) ? this.datePipe.transform(new Date(this.fecha), 'yyyy-MM-dd') : null;
      this.informacionTributariaService.reporte(this.cuenta, fechaFiltro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.tenenciaImpositiva = respuesta.datos;
            } else {
              this.tenenciaImpositiva = null;
            }

            this.cargando = false;
            this.cargando$.next(false);
          },
          error => {
            console.log(error);
            this.cargando = false;
            this.cargando$.next(false);
          }
        );
    }
  }

  /**
   * Descarga el reporte de tenencias impositivas
   */
  descargarExcel() {
    if (this.cargando == false && this.tenenciaImpositiva != null) {
      this.cargando = true;
      this.cargando$.next(true);

      this.informacionTributariaExpService.exportarTenenciasImpositiva(this.tenenciaImpositiva);

      this.cargando = false;
      this.cargando$.next(false);
    }
  }
}
