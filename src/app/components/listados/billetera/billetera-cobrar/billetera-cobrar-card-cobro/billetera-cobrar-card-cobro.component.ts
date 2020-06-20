import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { ProgramadorCobroMediosCobro } from '../../../../../enums/programador-cobro-medios-cobro.enum';

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

  mediosCobroEnum = ProgramadorCobroMediosCobro;
  medioDeCobroSeleccionado: ProgramadorCobroMediosCobro;
  fechaCobroProgramado: string;
  
  esCelular: boolean;
  isTransferencia: boolean = true;
  isChequeFisico: boolean = true;
  isCard: boolean = true;
  labelPosition: 'before' | 'after' = 'after';

  cobros = [{
    'id': 1,
    'fecha': '23/12/20',
    'monto': '12,000',
    'montototal': '123,000',
  },];

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
  }


  Transferencia() {
    this.isTransferencia = !this.isTransferencia;
  }

  chequeFisico() {
    this.isChequeFisico = !this.isChequeFisico;
  }

  cerrarVentana() {
    this.quitar.emit(this.cobroProgramado);
  }

}
