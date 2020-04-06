import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reporte-filtro-desktop',
  templateUrl: './reporte-filtro-desktop.component.html',
  styleUrls: ['./reporte-filtro-desktop.component.css'],
  providers: [DatePipe]
})
export class ReporteFiltroDesktopComponent implements OnInit {

  @Input()
  cuenta: string;

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  desde: Date;

  @Input()
  hasta: Date;

  @Input()
  disabled: boolean = false;
  
  fechaDesde: string;
  fechaHasta: string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.cargarFechasPorDefecto();
  }

  /**
   * Si se ha indicado fechas, se cargan
   */
  cargarFechasPorDefecto() {
    if (this.desde) {
      this.fechaDesde = this.desde.toISOString();
    } else {
      this.fechaDesde = null;
    }

    if (this.hasta) {
      this.fechaHasta = this.hasta.toISOString();
    } else {
      this.fechaHasta = null;
    }
  }

  // funcion que limpiar 
  limpiar() {
    this.cargarFechasPorDefecto();
  }

  /**
   * funcion que arma un filtro y lo notifica al llamador
   */
  aplicar() {
    if (this.cuenta) {

      let fechaDesdeFiltro = (this.fechaDesde) ? this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy') : null;
      let fechaHastaFiltro = (this.fechaHasta) ? this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy') : null;

      let filtro = {
        cuenta: this.cuenta,
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro
      }

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }
  }
}
