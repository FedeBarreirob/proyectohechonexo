import { Component, OnInit, Input } from '@angular/core';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';

@Component({
  selector: 'app-contratos-resumen-item-movil',
  templateUrl: './contratos-resumen-item-movil.component.html',
  styleUrls: ['./contratos-resumen-item-movil.component.css']
})
export class ContratosResumenItemMovilComponent implements OnInit {

  @Input()
  resumen: ResumenContratoCompraVenta;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }
}
