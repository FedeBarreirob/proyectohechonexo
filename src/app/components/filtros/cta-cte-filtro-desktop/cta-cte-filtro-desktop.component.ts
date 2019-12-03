import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfoCtaCte } from '../../../enums/info-cta-cte.enum';
import { DatePipe } from '@angular/common';
import { FiltroPersonalizadoParaFiltroCtaCte } from '../../../interfaces/varios/filtro-personalizado-para-filtro-cta-cte';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-cta-cte-filtro-desktop',
  templateUrl: './cta-cte-filtro-desktop.component.html',
  styleUrls: ['./cta-cte-filtro-desktop.component.css'],
  providers: [DatePipe]
})
export class CtaCteFiltroDesktopComponent implements OnInit {

  @Input()
  cuenta: any;

  @Input()
  infoCtaCteActivo: InfoCtaCte = InfoCtaCte.CUENTA_CORRIENTE_APLICADA;

  @Output()
  botonAplicar: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  filtroPersonalizado: Array<FiltroPersonalizadoParaFiltroCtaCte>;

  @Input()
  filtroPersonalizadoLabelDefault: string = "Todos";

  @Input()
  desde: Date;

  @Input()
  hasta: Date;

  filtroPersonalizadoSeleccionado: FiltroPersonalizadoParaFiltroCtaCte = null;
  filtrosTipoCheck: Array<any> = [];

  infoCtaCte: any = InfoCtaCte;
  fechaDesde: string;
  fechaHasta: string;
  rubro: any;
  rubros: Array<any> = [
    {
      codigo: "granos",
      texto: "Granos"
    },
    {
      codigo: "agroinsumos",
      texto: "Agroinsumos"
    },
    {
      codigo: "balanceado",
      texto: "Nutrición Animal"
    }
  ];

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
    }

    if (this.hasta) {
      this.fechaHasta = this.hasta.toISOString();
    }
  }

  /**
   * Selecciona un rubro
   * @param unRubro 
   */
  seleccionarRubro(unRubro: any) {
    this.rubro = unRubro;
  }

  // funcion que limpiar 
  limpiar() {
    this.rubro = null;
    this.filtrosTipoCheck = [];
    for (var i = 0; i < this.filtroPersonalizado.length; i++) {
      this.filtroPersonalizado[i].value = false;
    }
    var dt = new Date();
    dt.setDate(dt.getDate() - 7);
    this.fechaDesde = dt.toISOString();
    this.fechaHasta = new Date().toISOString();
  }

  /**
   * funcion que arma un filtro y lo notifica al llamador
   */
  aplicar() {
    if (this.cuenta && this.cuenta.id && this.cuenta.id.codigo) {

      let fechaDesdeFiltro = (this.fechaDesde) ? this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy') : null;
      let fechaHastaFiltro = (this.fechaHasta) ? this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy') : null;

      let filtro = {
        cuenta: this.cuenta.id.codigo,
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro
      }

      if (this.filtroPersonalizadoSeleccionado) {
        filtro[this.filtroPersonalizadoSeleccionado.filtroAtributo] = this.filtroPersonalizadoSeleccionado.value
      }

      filtro = this.filtroConFiltroRubros(filtro);
      filtro = this.filtroConFiltroChk(filtro);

      this.botonAplicar.emit(filtro);
    } else {
      this.botonAplicar.emit(null);
    }
  }

  /**
   * Agrega filtros según rubros
   * @param filtro Filtro sin rubros
   */
  filtroConFiltroRubros(filtro: any): any {

    let filtroConRubros = filtro;

    switch (this.rubro) {
      case "granos":
        filtroConRubros.granos = true;
        break;

      case "agroinsumos":
        filtroConRubros.agroinsumos = true;
        break;

      case "balanceado":
        filtroConRubros.nutricionAnimal = true;
        break;
    }

    return filtroConRubros;
  }

  /**
   * Función que muestra 
   */
  leyendaFiltroPersonalizado(): string {
    if (this.filtroPersonalizadoSeleccionado == null) {
      return this.filtroPersonalizadoLabelDefault;
    } else {
      return this.filtroPersonalizadoSeleccionado.descripcion;
    }
  }

  /**
   * Función encargada de seleccionar una opción personalizada dada
   * @param opcionPersonalizada 
   */
  seleccionarOpcionPersonalizada(opcionPersonalizada: FiltroPersonalizadoParaFiltroCtaCte) {
    this.filtroPersonalizadoSeleccionado = opcionPersonalizada;
  }

  /**
   * Función que aplica el filtro tipo checkbox al filtro principal
   * @param event 
   * @param checkboxChange 
   */
  seleccionarOpcionPersonalizadaCheckbox(checkboxChange: MatCheckboxChange, opcionPersonalizada: FiltroPersonalizadoParaFiltroCtaCte) {

    let filtroCheckAux = this.filtrosTipoCheck.filter(unFiltro => unFiltro.key != opcionPersonalizada.filtroAtributo);
    filtroCheckAux.push({
      key: opcionPersonalizada.filtroAtributo,
      value: checkboxChange.checked
    });

    this.filtrosTipoCheck = filtroCheckAux;
  }

  /**
   * Agrega filtros según filtros basados en checkboxes
   * @param filtro Filtro sin los nuevos filtros
   */
  filtroConFiltroChk(filtro: any): any {
    let filtroConFiltrosChk = filtro;

    this.filtrosTipoCheck.forEach(filtroChk => filtroConFiltrosChk[filtroChk.key] = filtroChk.value);

    return filtroConFiltrosChk;
  }
}
