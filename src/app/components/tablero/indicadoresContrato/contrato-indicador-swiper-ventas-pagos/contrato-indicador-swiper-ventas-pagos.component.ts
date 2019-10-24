import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorPagos } from '../../../../interfaces/contratos/indicadores/contratos-indicador-pagos';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contrato-indicador-swiper-ventas-pagos',
  templateUrl: './contrato-indicador-swiper-ventas-pagos.component.html',
  styleUrls: ['./contrato-indicador-swiper-ventas-pagos.component.css']
})
export class ContratoIndicadorSwiperVentasPagosComponent implements OnInit {

  @Input()
  indicadores: Array<ContratosIndicadorPagos>;

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
