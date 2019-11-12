import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrigenComprobante } from '../../../../../enums/origen-comprobante.enum';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FiltroComprobanteDescarga } from '../../../../../interfaces/archivo-de-comprobantes/filtro-comprobante-descarga';

@Component({
  selector: 'app-filtro-archivos-comprobantes',
  templateUrl: './filtro-archivos-comprobantes.component.html',
  styleUrls: ['./filtro-archivos-comprobantes.component.css'],
  providers: [DatePipe]
})
export class FiltroArchivosComprobantesComponent implements OnInit {
  
  @Input()
  cuenta: string;

  @Output()
  botonCerrar: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  origenComprobante: any = OrigenComprobante;
  origenSeleccionado: OrigenComprobante = OrigenComprobante.CONTRATOS;

  fechaDesde: string;
  fechaHasta: string;
  filtroIdentificacionComprobante: string;
  esCelular: boolean;

  constructor(
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.cargarFiltroPorDefecto();
  }

  /**
  * Función encargada de cargar el filtro por defecto
  */
  cargarFiltroPorDefecto() {
    let hace3Meses: Date = new Date();
    hace3Meses.setMonth(hace3Meses.getMonth() - 3);

    this.fechaDesde = hace3Meses.toISOString();
    this.fechaHasta = (new Date()).toISOString()
  }

  /**
   * Función encargada de cerrar el tab
   */
  cerrar() {
    this.botonCerrar.emit();
  }

  /**
   * Función encargada de limpiar los filtros para un nuevo filtrado
   */
  limpiar() {
    this.origenSeleccionado = OrigenComprobante.CONTRATOS;
    this.filtroIdentificacionComprobante = "";
    this.fechaDesde = "";
    this.fechaHasta = "";
  }

  /**
   * Notifica los filtros seleccionados para efectuar el filtrado en donde corresponda
   */
  aplicar() {
    if (this.cuenta) {
      let fechaDesdeFiltro = (this.fechaDesde) ? this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy') : null;
      let fechaHastaFiltro = (this.fechaHasta) ? this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy') : null;

      let filtro: FiltroComprobanteDescarga = {
        origen: this.origenSeleccionado,
        cuenta: this.cuenta,
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro,
        filtro: this.filtroIdentificacionComprobante,
        paginado: false
      };

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }

    this.cerrar();
  }
}
