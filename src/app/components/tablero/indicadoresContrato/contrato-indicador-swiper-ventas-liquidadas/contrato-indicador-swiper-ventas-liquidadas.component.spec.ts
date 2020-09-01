import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorSwiperVentasLiquidadasComponent } from './contrato-indicador-swiper-ventas-liquidadas.component';

describe('ContratoIndicadorSwiperVentasLiquidadasComponent', () => {
  let component: ContratoIndicadorSwiperVentasLiquidadasComponent;
  let fixture: ComponentFixture<ContratoIndicadorSwiperVentasLiquidadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorSwiperVentasLiquidadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorSwiperVentasLiquidadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
