import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { SaldoGlobalCtaCteAplicada } from '../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-saldo-cta-cte-aplicada-global',
  templateUrl: './saldo-cta-cte-aplicada-global.component.html',
  styleUrls: ['./saldo-cta-cte-aplicada-global.component.css']
})
export class SaldoCtaCteAplicadaGlobalComponent implements OnInit, OnDestroy {

  @Output()
  cargandoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  saldoGlobal: SaldoGlobalCtaCteAplicada;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  seObtuvoSaldoExito: boolean;

  constructor(
    private cuentaService: CuentaAlgService,
    private ctacteAplicadaService: CtacteAplicadaService
  ) { }

  ngOnInit() {
    this.cuentaService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => this.cargarSaldoGlobal(cuenta.id.codigo)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga los saldos globales de la cta cte aplicada
   * @param cuenta Identificación del productor
   */
  cargarSaldoGlobal(cuenta: string) {
    if (this.cargando == false) {

      this.cargando = true;
      this.cargandoChange.emit(true);

      this.ctacteAplicadaService.saldoGlobal(cuenta)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.saldoGlobal = respuesta.datos;
              this.seObtuvoSaldoExito = true;
            } else {
              this.seObtuvoSaldoExito = false;
            }

            this.cargando = false;
            this.cargandoChange.emit(false);
          },
          error => {
            console.log(error);
            this.cargando = false;
            this.cargandoChange.emit(false);
          }
        );
    }
  }
}
