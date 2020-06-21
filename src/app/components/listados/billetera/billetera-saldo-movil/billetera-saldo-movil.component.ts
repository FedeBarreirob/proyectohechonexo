import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SaldoGlobalCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-billetera-saldo-movil',
  templateUrl: './billetera-saldo-movil.component.html',
  styleUrls: ['./billetera-saldo-movil.component.css']
})
export class BilleteraSaldoMovilComponent implements OnInit, OnDestroy {

  destroy$: Subject<any> = new Subject<any>();
  saldoGlobal: SaldoGlobalCtaCteAplicada;
  cargando: boolean = false;
  seObtuvoSaldoExito: boolean = false;

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
          },
          error => {
            console.log(error);
            this.cargando = false;
          }
        );
    }
  }
}
