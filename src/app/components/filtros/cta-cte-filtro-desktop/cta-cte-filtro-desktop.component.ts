import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfoCtaCte } from '../../../enums/info-cta-cte.enum';
import { DatePipe } from '@angular/common';

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
  }

  /**
   * Selecciona un rubro
   * @param unRubro 
   */
  seleccionarRubro(unRubro: any) {
    this.rubro = unRubro;
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

      filtro = this.filtroConFiltroRubros(filtro);

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
}
