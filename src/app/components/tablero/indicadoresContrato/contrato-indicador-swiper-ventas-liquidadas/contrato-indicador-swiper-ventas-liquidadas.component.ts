import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorLiquidaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-liquidaciones';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

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

  constructor() { }

  ngOnInit() {
    this.configurarSwiper();
  }

  /**
   * Establecer la configuración de los swiper
   */
  private configurarSwiper() {
    this.config = {
      direction: 'horizontal',
      slidesPerView: 2,
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
