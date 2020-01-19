import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InformacionTributariaService } from '../../../../../services/informacion-tributaria/informacion-tributaria.service';
import { InformacionTributariaExportacionesService } from '../../../../../services/informacion-tributaria/informacion-tributaria-exportaciones.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComprobantePendienteFacturar } from '../../../../../interfaces/informacion-tributaria/comprobante-pendiente-facturar/comprobante-pendiente-facturar';
import { PerfilBasico } from '../../../../../interfaces/perfiles/perfil-basico';
import { AuthenticationService } from '../../../../../services/security/authentication.service';
import { ComprobantesPendFacturarService } from '../../../../../services/comprobantes-pend-facturar/comprobantes-pend-facturar.service';

@Component({
  selector: 'app-comprobantes-pendientes-facturar',
  templateUrl: './comprobantes-pendientes-facturar.component.html',
  styleUrls: ['./comprobantes-pendientes-facturar.component.css'],
  providers: [DatePipe]
})
export class ComprobantesPendientesFacturarComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: string;

  fecha: string;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  cargando$: Subject<boolean> = new Subject<boolean>();
  comprobantePendienteFacturar: ComprobantePendienteFacturar = null;
  unidadMedida: string;
  perfilBasico: PerfilBasico;

  constructor(
    private informacionTributariaService: InformacionTributariaService,
    private informacionTributariaExpService: InformacionTributariaExportacionesService,
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService,
    private compPendFactService: ComprobantesPendFacturarService
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

      var filtro = {
        cuenta: this.cuenta,
        fechaDesde: null,
        fechaHasta: null
      };

      //this.compPendFactService.listadoComprobPendFact(filtro)
      //  .pipe(takeUntil(this.destroy$))
      //  .subscribe(respuesta => {
      //    if (respuesta.exito == true) {
      //      this.comprobantePendienteFacturar = respuesta.datos;
      //    } else {
      //      this.comprobantePendienteFacturar = null;
      //    }

      //    this.cargando = false;
      //    this.cargando$.next(false);
      //  },
      //  error => {
      //    console.log(error);
      //    this.cargando = false;
      //    this.cargando$.next(false);
      //  });

      let fechaFiltro = (this.fecha) ? this.datePipe.transform(new Date(this.fecha), 'yyyy-MM-dd') : null;
      this.informacionTributariaService.reporte(this.cuenta, fechaFiltro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.comprobantePendienteFacturar = respuesta.datos;
            } else {
              this.comprobantePendienteFacturar = null;
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
   * Descarga el reporte de tenencias impositivas en formato Excel
   */
  descargarExcel() {
    if (this.cargando == false && this.comprobantePendienteFacturar != null) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaImpresion = this.datePipe.transform(new Date(this.fecha), 'dd-MM-yy');
      this.informacionTributariaExpService.exportarTenenciasImpositivaAExcel(this.comprobantePendienteFacturar, fechaImpresion);

      this.cargando = false;
      this.cargando$.next(false);
    }
  }

  /**
   * Descarga el reporte de tenencias impositivas en PDF
   */
  descargarPDF() {
    if (this.cargando == false && this.comprobantePendienteFacturar != null) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaImpresion = this.datePipe.transform(new Date(this.fecha), 'dd/MM/yyyy');
      this.informacionTributariaExpService.exportarTenenciasImpositivaAPDF(this.comprobantePendienteFacturar, fechaImpresion);

      this.cargando = false;
      this.cargando$.next(false);
    }
  }
}
