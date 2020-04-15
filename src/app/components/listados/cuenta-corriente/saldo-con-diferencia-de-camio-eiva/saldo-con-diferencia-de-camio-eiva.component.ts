import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { Subject } from 'rxjs';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-saldo-con-diferencia-de-camio-eiva',
  templateUrl: './saldo-con-diferencia-de-camio-eiva.component.html',
  styleUrls: ['./saldo-con-diferencia-de-camio-eiva.component.css']
})
export class SaldoConDiferenciaDeCamioEIvaComponent implements OnInit, OnDestroy {

  @Input()
  movimientos$: Subject<Array<MovimientoCtaCteAplicada>>;

  destroy$: Subject<any> = new Subject<any>();
  loading: boolean = false;
  saldo: number = null;

  constructor(private ctacteAplicadaService: CtacteAplicadaService) { }

  ngOnInit() {
    if (this.movimientos$) {
      this.movimientos$.subscribe(movimientos => this.cargarSaldo(movimientos));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga el saldo
   * @param movimientosCtaCteAplicada 
   */
  cargarSaldo(movimientosCtaCteAplicada: Array<MovimientoCtaCteAplicada>) {
    this.destroy$.next();
    this.loading = true;

    this.ctacteAplicadaService.saldoSegunComprobantes(movimientosCtaCteAplicada)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.saldo = respuesta.datos;
          } else {
            this.saldo = null;
          }
        },
        error => {
          console.log(error);
          this.loading = false;
          this.saldo = null;
        },
        () => this.loading = false);
  }

}
