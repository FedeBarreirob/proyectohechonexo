import { Component, OnInit } from '@angular/core';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { CtacteAplicadaService } from '../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { SaldoGlobalCtaCteAplicada } from '../../../interfaces/ctacte-aplicada/saldo-global-cta-cte-aplicada';

@Component({
  selector: 'app-saldo-cta-cte-aplicada-global',
  templateUrl: './saldo-cta-cte-aplicada-global.component.html',
  styleUrls: ['./saldo-cta-cte-aplicada-global.component.css']
})
export class SaldoCtaCteAplicadaGlobalComponent implements OnInit {

  saldoGlobal: SaldoGlobalCtaCteAplicada;
  cargando: boolean = false;

  constructor(
    private cuentaService: CuentaAlgService,
    private ctacteAplicadaService: CtacteAplicadaService
  ) { }

  ngOnInit() {
    this.cuentaService.cuentaSeleccionada$.subscribe(
      cuenta => this.cargarSaldoGlobal(cuenta.id.codigo)
    );
  }

  /**
   * Carga los saldos globales de la cta cte aplicada
   * @param cuenta Identificación del productor
   */
  cargarSaldoGlobal(cuenta: string) {
    if (this.cargando == false) {

      this.cargando = true;

      this.ctacteAplicadaService.saldoGlobal(cuenta).subscribe(
        respuesta => {

          if (respuesta.exito == true) {
            this.saldoGlobal = respuesta.datos;
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
