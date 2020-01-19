import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InformacionTributariaService } from '../../../../../services/informacion-tributaria/informacion-tributaria.service';
import { InformacionTributariaExportacionesService } from '../../../../../services/informacion-tributaria/informacion-tributaria-exportaciones.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InsumoPendiente } from '../../../../../interfaces/informacion-tributaria/insumo-pendiente/insumo-pendiente';
import { PerfilBasico } from '../../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../../services/security/authentication.service';

@Component({
  selector: 'app-insumos-pendientes',
  templateUrl: './insumos-pendientes.component.html',
  styleUrls: ['./insumos-pendientes.component.css'],
  providers: [DatePipe]
})
export class InsumosPendientesComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: string;

  fecha: string;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  cargando$: Subject<boolean> = new Subject<boolean>();
  insumoPendiente: InsumoPendiente = null;
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
   * Función encargada de generar el reporte de insumos pendientes
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
            this.insumoPendiente = respuesta.datos;
          } else {
            this.insumoPendiente = null;
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
   * Descarga el reporte de insumos pendientes en formato Excel
   */
  descargarExcel() {
    if (this.cargando == false && this.insumoPendiente != null) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaImpresion = this.datePipe.transform(new Date(this.fecha), 'dd-MM-yy');
      this.informacionTributariaExpService.exportarTenenciasImpositivaAExcel(this.insumoPendiente, fechaImpresion);

      this.cargando = false;
      this.cargando$.next(false);
    }
  }

  /**
   * Descarga el reporte de insumos pendientes en PDF
   */
  descargarPDF() {
    if (this.cargando == false && this.insumoPendiente != null) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaImpresion = this.datePipe.transform(new Date(this.fecha), 'dd/MM/yyyy');
      this.informacionTributariaExpService.exportarTenenciasImpositivaAPDF(this.insumoPendiente, fechaImpresion);

      this.cargando = false;
      this.cargando$.next(false);
    }
  }
}
