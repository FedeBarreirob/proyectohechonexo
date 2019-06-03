import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorPesificaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-pesificaciones';

@Component({
  selector: 'app-contrato-indicador-venta-pesificadas',
  templateUrl: './contrato-indicador-venta-pesificadas.component.html',
  styleUrls: ['./contrato-indicador-venta-pesificadas.component.css']
})
export class ContratoIndicadorVentaPesificadasComponent implements OnInit {

  @Input()
  indicador: ContratosIndicadorPesificaciones;

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
