import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { ProgramadorCobroMediosCobro } from '../../../../../enums/programador-cobro-medios-cobro.enum';
import { ChequeLugarRetiro } from '../../../../../enums/cheque-lugar-retiro.enum';

@Component({
  selector: 'app-billetera-cobrar-card-cobro',
  templateUrl: './billetera-cobrar-card-cobro.component.html',
  styleUrls: ['./billetera-cobrar-card-cobro.component.css'],
  providers: [DatePipe]
})
export class BilleteraCobrarCardCobroComponent implements OnInit {

  @Input()
  cobroProgramado: any;

  @Output()
  quitar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  mediosCobroEnum = ProgramadorCobroMediosCobro;
  medioDeCobroSeleccionado: ProgramadorCobroMediosCobro;
  fechaCobroProgramado: string;
  lugarRetiroSeleccionado: ChequeLugarRetiro;

  lugarRetiro = ChequeLugarRetiro;
  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    console.log(this.cobroProgramado);
    this.esCelular = this.deviceService.isMobile();
    this.fechaCobroProgramado = this.cobroProgramado.fechaCobroProgramado.toISOString();
  }

  /**
   * Indica la cuenta bancaria
   * @param cuentaBancaria 
   */
  seleccionarCuentaBancaria(cuentaBancaria: any) {
    this.cobroProgramado.cuentaBancaria = cuentaBancaria;
    this.notificarCambios();
  }

  /**
   * Notifica que ha cambiado el cobro programado
   */
  notificarCambios() {
    this.actualizarDatosCobroProgramado();
    this.change.emit();
  }

  actualizarDatosCobroProgramado() {
    this.cobroProgramado.fechaCobroProgramado = (this.fechaCobroProgramado) ? new Date(this.fechaCobroProgramado) : null;
    this.cobroProgramado.medioDeCobroSeleccionado = this.medioDeCobroSeleccionado;
    this.cobroProgramado.lugarRetiroSeleccionado = this.lugarRetiroSeleccionado;
  }

  cerrarVentana() {
    this.quitar.emit(this.cobroProgramado);
  }
}
