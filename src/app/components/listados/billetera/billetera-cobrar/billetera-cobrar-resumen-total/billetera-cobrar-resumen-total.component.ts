import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { FinanzasProgramadorCobrosService } from '../../../../../services/finanzas/finanzas-programador-cobros.service';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ProgramadorCobroMediosCobro } from '../../../../../enums/programador-cobro-medios-cobro.enum';
import { EntidadAlg } from '../../../../../interfaces/perfiles/entidad-alg';

@Component({
  selector: 'app-billetera-cobrar-resumen-total',
  templateUrl: './billetera-cobrar-resumen-total.component.html',
  styleUrls: ['./billetera-cobrar-resumen-total.component.css'],
  providers: [DatePipe]
})
export class BilleteraCobrarResumenTotalComponent implements OnInit {

  @Input()
  cobrosProgramados$: BehaviorSubject<any>;

  @Input()
  cuenta: EntidadAlg;

  @Output()
  mostrarResumen: EventEmitter<any> = new EventEmitter<any>();

  esCelular: boolean;
  guardando: boolean = false;
  total: number = 0;

  constructor(
    private deviceService: DeviceDetectorService,
    private finanzasProgramadorCobrosService: FinanzasProgramadorCobrosService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    if (this.cobrosProgramados$) {
      this.cobrosProgramados$.asObservable().subscribe(
        cobrosProgramados => {
          this.actualizarTotal(cobrosProgramados);
        }
      );

      this.actualizarTotal(this.cobrosProgramados$.getValue());
    }
  }

  /**
   * Sumar los importes ingresados
   */
  actualizarTotal(cobrosProgramados?: Array<any>) {
    if (cobrosProgramados && cobrosProgramados.length > 0) {
      this.total = cobrosProgramados
        .map(cobro => cobro.monto)
        .reduce((acum, current) => Number.parseFloat(acum) + Number.parseFloat(current), 0);
    } else {
      this.total = 0;
    }
  }

  /**
   * Muestra una notificacion
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Función encargada de efectuar la solicitud de cobro
   */
  registrarSolicitudDeCobro() {
    if (this.guardando == false) {

      this.guardando = true;

      let solicitudDeCobro = this.datosSolicitudRegistro();

      this.finanzasProgramadorCobrosService.registroSolicitudDeCobro(solicitudDeCobro)
        .subscribe(
          respuesta => {
            this.openSnackBar(respuesta.mensaje);

            if (respuesta.exito == true) {
              this.mostrarResumen.emit(respuesta.datos);
            }
          },
          error => {
            console.log(error);
            this.guardando = false;
          },
          () => this.guardando = false);
    }

  }

  /**
   * Devuelve los datos de la solicitud a enviar al servicio de registro
   */
  datosSolicitudRegistro() {
    try {
      let cobrosProgramadosIngresados: Array<any> = this.cobrosProgramados$.getValue();
      let cobrosProgramados = cobrosProgramadosIngresados.map(cobroProgramadoIngresado => {

        let chequeFisicoDTO = (cobroProgramadoIngresado.medioDeCobroSeleccionado == ProgramadorCobroMediosCobro.CHEQUE_FISICO) ?
          { lugarRetiro: cobroProgramadoIngresado.lugarRetiroSeleccionado } : null;

        let cuentaBancariaDestinoDTO = (cobroProgramadoIngresado.medioDeCobroSeleccionado == ProgramadorCobroMediosCobro.TRANSFERENCIA_BANCARIA && cobroProgramadoIngresado.cuentaBancaria) ?
          { id: cobroProgramadoIngresado.cuentaBancaria.id } : null;

        return {
          monto: cobroProgramadoIngresado.monto,
          fechaACobrar: (cobroProgramadoIngresado.fechaCobroProgramado) ? this.datePipe.transform(cobroProgramadoIngresado.fechaCobroProgramado, 'dd/MM/yyyy') : null,
          chequeFisicoDTO,
          cuentaBancariaDestinoDTO
        };
      });

      return {
        cuenta: this.cuenta.id.codigo,
        fechaVencimiento: this.datePipe.transform(cobrosProgramadosIngresados[0].fechaVencimiento, 'dd/MM/yyyy'),
        cobrosProgramados
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  get hayCobrosProgramados(): boolean {
    let cobrosProgramados: Array<any> = this.cobrosProgramados$.getValue();
    if (cobrosProgramados && cobrosProgramados.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
