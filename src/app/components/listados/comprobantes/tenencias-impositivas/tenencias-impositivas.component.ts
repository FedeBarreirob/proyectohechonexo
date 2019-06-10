import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InformacionTributariaService } from '../../../../services/informacion-tributaria/informacion-tributaria.service';
import { InformacionTributariaExportacionesService } from '../../../../services/informacion-tributaria/informacion-tributaria-exportaciones.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private informacionTributariaService: InformacionTributariaService,
    private informacionTributariaExpService: InformacionTributariaExportacionesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.fecha = (new Date()).toISOString();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Descarga el reporte de tenencias impositivas
   */
  descargar() {
    if (this.cargando == false) {
      this.cargando = true;
      this.cargando$.next(true);

      let fechaFiltro = (this.fecha) ? this.datePipe.transform(new Date(this.fecha), 'yyyy-MM-dd') : null;
      this.informacionTributariaService.reporte(this.cuenta, fechaFiltro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.informacionTributariaExpService.exportarTenenciasImpositiva(respuesta.datos);
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
}
