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

  @Input()
  cobrosProgramados$: BehaviorSubject<any>;

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

    this.notificarCambios();
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

    this.notificarCambios();
  }

  /**
   * Quita un cobro del listado
   * @param cobroProgramado 
   */
  quitarCobro(cobroProgramado: any) {
    this.cobrosProgramados = this.cobrosProgramados.filter(cobro => cobro !== cobroProgramado);
    this.notificarCambios();
  }

  notificarCambios() {
    this.notificarCambiosEnMontosIngresados();
    this.notificarCambiosEnCobrosProgramados();
  }

  notificarCambiosEnMontosIngresados() {
    this.actualizarMontoMaximoTodosLosCobros();
    this.actualizarTotal$.next(this.cobrosProgramados);
  }

  notificarCambiosEnCobrosProgramados() {
    this.cobrosProgramados$.next(this.cobrosProgramados);
  }

  /**
   * Actualiza el monto máximo indicado en cada cobro deacuero a los importes ingresados
   */
  actualizarMontoMaximoTodosLosCobros() {
    if (this.cobrosProgramados && this.cobrosProgramados.length > 1) {

      let vencimientoACobrar = this.vencimientoACobrarSeleccionado$.getValue();

      let montoMaximo: number = vencimientoACobrar.montoMaximoACobrar;
      let sumatoriaMontos: number = this.cobrosProgramados[0].monto;
      for (let i = 1; i < this.cobrosProgramados.length; i++) {

        let montoMaximoACobrar: number = montoMaximo - sumatoriaMontos;
        this.cobrosProgramados[i].montoMaximoACobrar = (montoMaximoACobrar > 0) ? montoMaximoACobrar : 0;

        sumatoriaMontos += Number.parseFloat(this.cobrosProgramados[i].monto);
      }

    }
  }
}
