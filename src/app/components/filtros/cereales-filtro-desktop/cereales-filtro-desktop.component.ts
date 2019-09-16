import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiltroEspecieCosecha } from '../../../interfaces/varios/filtro-especie-cosecha';
import { Especie } from '../../../interfaces/varios/especie';
import { Cosecha } from '../../../interfaces/varios/cosecha';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cereales-filtro-desktop',
  templateUrl: './cereales-filtro-desktop.component.html',
  styleUrls: ['./cereales-filtro-desktop.component.css'],
  providers: [DatePipe]
})
export class CerealesFiltroDesktopComponent implements OnInit {

  @Input()
  filtrosEspecieCosecha: FiltroEspecieCosecha;

  @Input()
  cuenta: any;

  @Input()
  disabled: boolean = false;

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  public especie: Especie = null;
  public cosecha: Cosecha = null;
  public fechaDesde: string;
  public fechaHasta: string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  /**
   * Función encargada de seleccionar una especie dada
   * @param especie 
   */
  seleccionarProducto(especie: Especie) {
    this.especie = especie;
  }

  /**
   * Devuelve el nombre del filtro de producto según el filtro efectuado
   */
  leyendaFiltroProducto(): string {
    if (this.especie == null) {
      return "Todos los productos";
    } else {
      return this.especie.especieDescripcion;
    }
  }

  /**
   * Función encargada de seleccionar una campaña dada
   * @param cosecha 
   */
  seleccionarCampania(cosecha: Cosecha) {
    this.cosecha = cosecha;
  }

  /**
   * Devuelve el nombre del filtro de campaña según el filtro efectuado
   */
  leyendaFiltroCampania(): string {
    if (this.cosecha == null) {
      return "Todas las campañas";
    } else {
      return this.cosecha.cosechaDescripcion;
    }
  }

  /**
   * Función encargada de ejecutar el proceso de filtrado
   */
  aplicar() {
    if (this.cuenta && this.cuenta.id && this.cuenta.id.codigo) {

      let fechaDesdeFiltro = (this.fechaDesde) ? this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy') : null;
      let fechaHastaFiltro = (this.fechaHasta) ? this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy') : null;

      let filtro = {
        cuenta: this.cuenta.id.codigo,
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro,
        especie: (this.especie) ? this.especie.codigoEspecie : null,
        cosecha: (this.cosecha) ? this.cosecha.cosecha : null
      }

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }
  }
}
