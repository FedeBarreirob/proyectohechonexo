import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorSwiperVentasComponent } from './contrato-indicador-swiper-ventas.component';

describe('ContratoIndicadorSwiperVentasComponent', () => {
  let component: ContratoIndicadorSwiperVentasComponent;
  let fixture: ComponentFixture<ContratoIndicadorSwiperVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorSwiperVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorSwiperVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
