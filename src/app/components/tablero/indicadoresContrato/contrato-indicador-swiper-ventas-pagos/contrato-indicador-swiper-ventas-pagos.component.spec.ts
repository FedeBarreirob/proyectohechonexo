import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorSwiperVentasPagosComponent } from './contrato-indicador-swiper-ventas-pagos.component';

describe('ContratoIndicadorSwiperVentasPagosComponent', () => {
  let component: ContratoIndicadorSwiperVentasPagosComponent;
  let fixture: ComponentFixture<ContratoIndicadorSwiperVentasPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorSwiperVentasPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorSwiperVentasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
