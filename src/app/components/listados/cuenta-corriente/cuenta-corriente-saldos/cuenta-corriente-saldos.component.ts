import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SaldosTotales } from '../../../../interfaces/ctacte/listado.ctacte';
import { CtacteService } from '../../../../services/ctacte/ctacte.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta-corriente-saldos',
  templateUrl: './cuenta-corriente-saldos.component.html',
  styleUrls: ['./cuenta-corriente-saldos.component.css']
})
export class CuentaCorrienteSaldosComponent implements OnInit, OnDestroy {

  @Input()
  observerFiltro$: Subject<any>;

  saldo: SaldosTotales;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private ctacteService: CtacteService
  ) { }

  ngOnInit() {
    // observer del filtro
    this.observerFiltro$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        filtro => {
          this.cargarSaldo(filtro);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cargar los saldos en pantalla
   * @param filtro 
   */
  cargarSaldo(filtro: any) {
    if (this.cargando == false) {
      this.cargando = true;

      this.ctacteService.saldoCtaCte(filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.saldo = respuesta.datos;
            } else {
              this.saldo = null;
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
