import { Component, OnInit, Input } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';

@Component({
  selector: 'app-contratos-resumen-item-desktop',
  templateUrl: './contratos-resumen-item-desktop.component.html',
  styleUrls: ['./contratos-resumen-item-desktop.component.css']
})
export class ContratosResumenItemDesktopComponent implements OnInit {

  @Input()
  resumen: ResumenContratoCompraVenta;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
