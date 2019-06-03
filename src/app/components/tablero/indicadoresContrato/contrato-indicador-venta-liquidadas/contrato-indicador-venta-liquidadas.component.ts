import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorLiquidaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-liquidaciones';

@Component({
  selector: 'app-contrato-indicador-venta-liquidadas',
  templateUrl: './contrato-indicador-venta-liquidadas.component.html',
  styleUrls: ['./contrato-indicador-venta-liquidadas.component.css']
})
export class ContratoIndicadorVentaLiquidadasComponent implements OnInit {

  @Input()
  indicador: ContratosIndicadorLiquidaciones;

  @Input()
  unidadMedida: string;

  thresholdConfig = {
    '0': { color: '#f9951e' },
    '50': { color: '#fec300' },
    '100': { color: '#00c850' }
  };

  constructor() { }

  ngOnInit() {
  }

}
