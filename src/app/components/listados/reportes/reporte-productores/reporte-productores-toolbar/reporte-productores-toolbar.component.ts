import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-reporte-productores-toolbar',
  templateUrl: './reporte-productores-toolbar.component.html',
  styleUrls: ['./reporte-productores-toolbar.component.css']
})
export class ReporteProductoresToolbarComponent implements OnInit {

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  botonDescargarExcel: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  disabled: boolean = false;

  fechaDesde: Date = null;
  fechaHasta: Date = null;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Limpia los controles
   */
  limpiar() {
    this.fechaDesde = null;
    this.fechaHasta = null;
  }

  /**
   * funcion que arma un filtro y lo notifica al llamador
   */
  aplicar() {
    let filtro = {
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta
    }
    this.botonAplicar.emit(filtro);
  }

  /**
   * Verifica que las fechas esten seteadas las dos o ninguna
   */
  get esFechasValido() {
    return !((this.fechaDesde == null && this.fechaHasta == null) || (this.fechaDesde != null && this.fechaHasta != null));
  }

  /**
   * Notifica que se debe ejecutar la generación del archivo de excel
   */
  descargarExcel() {
    this.botonDescargarExcel.emit();
  }
}
