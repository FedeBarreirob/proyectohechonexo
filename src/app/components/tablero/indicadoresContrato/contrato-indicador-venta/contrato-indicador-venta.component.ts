import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorFijaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-fijaciones';
import { DeviceDetectorService } from 'ngx-device-detector';

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
