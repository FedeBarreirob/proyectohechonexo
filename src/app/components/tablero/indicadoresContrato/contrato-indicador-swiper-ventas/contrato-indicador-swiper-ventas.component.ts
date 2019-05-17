import { Component, OnInit, Input } from '@angular/core';
import { ContratosIndicadorFijaciones } from '../../../../interfaces/contratos/indicadores/contratos-indicador-fijaciones';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-contrato-indicador-swiper-ventas',
  templateUrl: './contrato-indicador-swiper-ventas.component.html',
  styleUrls: ['./contrato-indicador-swiper-ventas.component.css']
})
export class ContratoIndicadorSwiperVentasComponent implements OnInit {

  @Input()
  indicadores: Array<ContratosIndicadorFijaciones>;

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
