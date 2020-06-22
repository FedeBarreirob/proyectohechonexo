import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorLiquidaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-liquidaciones';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contrato-indicador-swiper-ventas-liquidadas',
  templateUrl: './contrato-indicador-swiper-ventas-liquidadas.component.html',
  styleUrls: ['./contrato-indicador-swiper-ventas-liquidadas.component.css']
})
export class ContratoIndicadorSwiperVentasLiquidadasComponent implements OnInit {

  @Input()
  indicadores: Array<ContratosIndicadorLiquidaciones>;

  @Input()
  unidadMedida: string;

  public config: SwiperConfigInterface;
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.configurarSwiper();
  }

  /**
   * Establecer la configuración de los swiper
   */
  private configurarSwiper() {
    this.config = {
      direction: 'horizontal',
      slidesPerView: (this.esCelular) ? 2 : 3,
      keyboard: true,
      mousewheel: true,
      scrollbar: false,
      navigation: false,
      pagination: this.pagination
    };
  }

  /**
   * Devuelve la configuración del paginador
   */
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };
}
