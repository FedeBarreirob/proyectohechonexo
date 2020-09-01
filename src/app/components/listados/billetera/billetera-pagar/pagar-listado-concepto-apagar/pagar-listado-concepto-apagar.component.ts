import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FechasUtilService } from '../../../../../services/sharedServices/convertidores/fechas-util.service';

@Component({
  selector: 'app-pagar-listado-concepto-apagar',
  templateUrl: './pagar-listado-concepto-apagar.component.html',
  styleUrls: ['./pagar-listado-concepto-apagar.component.css']
})
export class PagarListadoConceptoAPagarComponent implements OnInit {

  @Input()
  concepto: MovimientoCtaCteAplicada;

  @Input()
  esConceptoSeleccionado: boolean = false;

  @Output()
  seleccion: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fechasUtilService: FechasUtilService) { }

  ngOnInit() {
  }

  /**
   * Determina si es vencido
   */
  get esVencido(): boolean {
    if (this.concepto) {
      let hoy: Date = this.fechasUtilService.hoyFechaUnicamente();
      let fechaVecimiento: Date = this.fechasUtilService.fechaEsADate(<any>this.concepto.fechaVencimiento);

      if (fechaVecimiento <= hoy) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

  /**
   * Notifica que el moviemiento fue seleccionado o no
   * @param seleccionado 
   */
  notificarSeleccion(seleccionado: boolean) {
    this.seleccion.emit({
      concepto: this.concepto,
      seleccionado
    });
  }
}
