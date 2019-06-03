import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorSwiperVentasPesificadasComponent } from './contrato-indicador-swiper-ventas-pesificadas.component';

describe('ContratoIndicadorSwiperVentasPesificadasComponent', () => {
  let component: ContratoIndicadorSwiperVentasPesificadasComponent;
  let fixture: ComponentFixture<ContratoIndicadorSwiperVentasPesificadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorSwiperVentasPesificadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorSwiperVentasPesificadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
