import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorFijaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-fijaciones';

@Component({
  selector: 'app-contrato-indicador-venta',
  templateUrl: './contrato-indicador-venta.component.html',
  styleUrls: ['./contrato-indicador-venta.component.css']
})
export class ContratoIndicadorVentaComponent implements OnInit {

  @Input()
  indicador: ContratosIndicadorFijaciones;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
