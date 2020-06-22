import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorLiquidaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-liquidaciones';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  esCelular: boolean;

  thresholdConfig = {
    '0': { color: '#f9951e' },
    '50': { color: '#fec300' },
    '100': { color: '#00c850' }
  };

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
