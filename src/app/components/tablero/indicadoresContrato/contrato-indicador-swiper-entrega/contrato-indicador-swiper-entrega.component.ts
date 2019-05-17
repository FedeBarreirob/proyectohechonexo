import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { ContratosIndicadorEntregas } from 'src/app/interfaces/contratos/indicadores/contratos-indicador-entregas';

@Component({
  selector: 'app-contrato-indicador-swiper-entrega',
  templateUrl: './contrato-indicador-swiper-entrega.component.html',
  styleUrls: ['./contrato-indicador-swiper-entrega.component.css']
})
export class ContratoIndicadorSwiperEntregaComponent implements OnInit {

  @Input()
  indicadores: Array<ContratosIndicadorEntregas>;

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
