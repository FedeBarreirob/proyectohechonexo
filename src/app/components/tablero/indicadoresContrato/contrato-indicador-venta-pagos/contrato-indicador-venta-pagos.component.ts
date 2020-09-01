import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorPagos } from '../../../../interfaces/contratos/indicadores/contratos-indicador-pagos';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contrato-indicador-venta-pagos',
  templateUrl: './contrato-indicador-venta-pagos.component.html',
  styleUrls: ['./contrato-indicador-venta-pagos.component.css']
})
export class ContratoIndicadorVentaPagosComponent implements OnInit {

  @Input()
  indicador: ContratosIndicadorPagos;

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
