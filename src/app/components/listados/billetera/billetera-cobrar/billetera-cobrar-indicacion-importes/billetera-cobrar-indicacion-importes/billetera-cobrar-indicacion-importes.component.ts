import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-billetera-cobrar-indicacion-importes',
  templateUrl: './billetera-cobrar-indicacion-importes.component.html',
  styleUrls: ['./billetera-cobrar-indicacion-importes.component.css']
})
export class BilleteraCobrarIndicacionImportesComponent implements OnInit {

  @Input()
  vencimientoACobrarSeleccionado$: BehaviorSubject<any>;

  cobrosProgramados: Array<any>;
  actualizarTotal$: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {
    if (this.vencimientoACobrarSeleccionado$) {
      this.vencimientoACobrarSeleccionado$.subscribe(vencimientoACobrar => {
        this.prepararDefaultCobro(vencimientoACobrar);
      });
    }
  }

  /**
   * Crea un cobro vacío para comenzar la programación de cobros
   * @param vencimientoACobrar 
   */
  prepararDefaultCobro(vencimientoACobrar: any) {
    if (vencimientoACobrar) {
      let primerCobro = {
        monto: vencimientoACobrar.montoMaximoACobrar,
        montoMaximoACobrar: vencimientoACobrar.montoMaximoACobrar,
        fechaVencimiento: vencimientoACobrar.fechaVencimiento,
        fechaCobroProgramado: vencimientoACobrar.fechaVencimiento
      }

      this.cobrosProgramados = [];
      this.cobrosProgramados.push(primerCobro);
    }

    this.notificarCambiosEnMontosIngresados();
  }

  agregarCobro() {
    let vencimientoACobrar = this.vencimientoACobrarSeleccionado$.getValue();

    if (vencimientoACobrar) {
      this.cobrosProgramados.push({
        monto: vencimientoACobrar.montoMaximoACobrar,
        montoMaximoACobrar: vencimientoACobrar.montoMaximoACobrar,
        fechaVencimiento: vencimientoACobrar.fechaVencimiento,
        fechaCobroProgramado: vencimientoACobrar.fechaVencimiento
      });
    }

    this.notificarCambiosEnMontosIngresados();
  }

  /**
   * Quita un cobro del listado
   * @param cobroProgramado 
   */
  quitarCobro(cobroProgramado: any) {
    this.cobrosProgramados = this.cobrosProgramados.filter(cobro => cobro !== cobroProgramado);
    this.notificarCambiosEnMontosIngresados();
  }

  notificarCambiosEnMontosIngresados() {
    this.actualizarTotal$.next(this.cobrosProgramados);
  }
}
