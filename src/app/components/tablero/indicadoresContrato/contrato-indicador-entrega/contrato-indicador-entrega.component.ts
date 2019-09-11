import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorEntregas } from 'src/app/interfaces/contratos/indicadores/contratos-indicador-entregas';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contrato-indicador-entrega',
  templateUrl: './contrato-indicador-entrega.component.html',
  styleUrls: ['./contrato-indicador-entrega.component.css']
})
export class ContratoIndicadorEntregaComponent implements OnInit {

  @Input()
  indicador: ContratosIndicadorEntregas;

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
