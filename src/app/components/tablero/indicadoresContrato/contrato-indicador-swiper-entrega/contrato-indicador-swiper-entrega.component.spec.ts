import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorSwiperEntregaComponent } from './contrato-indicador-swiper-entrega.component';

describe('ContratoIndicadorSwiperEntregaComponent', () => {
  let component: ContratoIndicadorSwiperEntregaComponent;
  let fixture: ComponentFixture<ContratoIndicadorSwiperEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorSwiperEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorSwiperEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
