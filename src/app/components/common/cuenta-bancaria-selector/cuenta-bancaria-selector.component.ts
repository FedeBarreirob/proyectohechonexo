import { Component, OnInit, OnDestroy } from '@angular/core';
import { CuentasBancariasService } from '../../../services/cuentas-bancarias/cuentas-bancarias.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CuentaBancariaEstado } from '../../../enums/cuenta-bancaria-estado.enum';

@Component({
  selector: 'app-cuenta-bancaria-selector',
  templateUrl: './cuenta-bancaria-selector.component.html',
  styleUrls: ['./cuenta-bancaria-selector.component.css']
})
export class CuentaBancariaSelectorComponent implements OnInit, OnDestroy {

  cuenta: EntidadAlg;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  cuentasBancarias: Array<any>;
  cuentaBancariaEstado = CuentaBancariaEstado;
  cuentaSeleccionada: any;

  constructor(
    private cuentasBancariasService: CuentasBancariasService,
    private cuentaService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.cuentaService.cuentaAlgSeleccionadaV2$.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cuenta = cuenta;
          this.cargarCuentasBancarias();
        }
      );

    if (this.cuentaService.cuentaAlgSeleccionadaV2$.getValue()) {
      this.cuenta = this.cuentaService.cuentaAlgSeleccionadaV2$.getValue();
      this.cargarCuentasBancarias();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga las cuentas bancarias vinculadas a la cuenta actual
   */
  cargarCuentasBancarias() {
    if (this.cargando == false && this.cuenta) {

      this.cargando = true;

      this.cuentasBancariasService.cuentasBancarias(this.cuenta.id.codigo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.cuentasBancarias = respuesta.datos;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );
    }
  }

  seleccionarCuenta(cuentaSeleccionada: any) {
    this.cuentaSeleccionada = cuentaSeleccionada;
  }
}
