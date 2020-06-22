import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { ProgramadorCobroMediosCobro } from '../../../../../enums/programador-cobro-medios-cobro.enum';
import { ChequeLugarRetiro } from '../../../../../enums/cheque-lugar-retiro.enum';

@Component({
  selector: 'app-billetera-cobrar-resumen',
  templateUrl: './billetera-cobrar-resumen.component.html',
  styleUrls: ['./billetera-cobrar-resumen.component.css']
})
export class BilleteraCobrarResumenComponent implements OnInit {

  @Input()
  cobrosProgramados$: BehaviorSubject<any>;

  cobrosProgramados: Array<any>;
  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.cobrosProgramados$) {
      this.cobrosProgramados$.asObservable().subscribe(
        cobrosProgramados => {
          this.cobrosProgramados = cobrosProgramados;
          console.log(cobrosProgramados);
        }
      );

      this.cobrosProgramados = this.cobrosProgramados$.getValue();
    }
  }

  /**
   * Devuelve en medio de cobro de un cobro programado dado
   * @param cobrosProgramado
   */
  medioCobro(cobrosProgramado: any) {
    switch (cobrosProgramado.medioDeCobroSeleccionado) {
      case ProgramadorCobroMediosCobro.TRANSFERENCIA_BANCARIA:
        return "Transferencia";

      case ProgramadorCobroMediosCobro.CHEQUE_FISICO:
        return "Cheque físico";

      case ProgramadorCobroMediosCobro.CHEQUE_DIGITAL:
        return "Cheque digital";

      default:
        return "No definido";
    }
  }

  /**
   * Devuelve información adicional correspondiente al medio de cobro seleccionado,
   * ej, destinatario de la transferencia etc
   * @param cobrosProgramado 
   */
  infoAdicionalMedioCobroSeleccionado(cobrosProgramado: any) {
    switch (cobrosProgramado.medioDeCobroSeleccionado) {
      case ProgramadorCobroMediosCobro.TRANSFERENCIA_BANCARIA:
        return (cobrosProgramado.cuentaBancaria && cobrosProgramado.cuentaBancaria.banco) ? `Destinatario: ${cobrosProgramado.cuentaBancaria.referencia} (${cobrosProgramado.cuentaBancaria.banco.descripcionCorta})` : "";

      case ProgramadorCobroMediosCobro.CHEQUE_FISICO:
        return `Lugar de retiro: ${this.lugarRetiroCheque(cobrosProgramado.lugarRetiroSeleccionado)}`;

      case ProgramadorCobroMediosCobro.CHEQUE_DIGITAL:
        return "no implementado";

      default:
        return "No definido";
    }
  }

  /**
   * Devuelve el texto correpondiente al lugar de retiro indicado
   * @param lugarRetiroSeleccionado
   */
  lugarRetiroCheque(lugarRetiroSeleccionado: any): string {
    switch (lugarRetiroSeleccionado) {
      case ChequeLugarRetiro.BANCO_MACRO:
        return "Banco Macro";

      case ChequeLugarRetiro.CASA_CENTRAL:
        return "Casa Central";

      default:
        return "no definido";
    }
  }
}
