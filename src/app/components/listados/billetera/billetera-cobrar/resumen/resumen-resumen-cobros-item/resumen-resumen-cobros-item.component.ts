import { Component, OnInit, Input } from '@angular/core';
import { ChequeLugarRetiro } from 'src/app/enums/cheque-lugar-retiro.enum';

@Component({
  selector: 'app-resumen-resumen-cobros-item',
  templateUrl: './resumen-resumen-cobros-item.component.html',
  styleUrls: ['./resumen-resumen-cobros-item.component.css']
})
export class ResumenResumenCobrosItemComponent implements OnInit {

  @Input()
  cobroProgramado: any;

  constructor() { }

  ngOnInit() {
  }

  get medio(): string {
    if (this.cobroProgramado.cuentaBancariaDestinoDTO) {
      return "Transferencia bancaria";
    } else if (this.cobroProgramado.chequeFisicoDTO) {
      return "Cheque";
    } else {
      return "";
    }
  }

  get detalle(): string {
    if (this.cobroProgramado.cuentaBancariaDestinoDTO) {
      return `Destinatario: cuenta ${this.cobroProgramado.cuentaBancariaDestinoDTO.referencia}`;
    } else if (this.cobroProgramado.chequeFisicoDTO) {
      return `Retiro: ${this.cobroProgramado.chequeFisicoDTO.lugarRetiro == ChequeLugarRetiro.BANCO_MACRO ? 'Banco Macro' : 'Casa Central'}`;
    } else {
      return "";
    }
  }
}
