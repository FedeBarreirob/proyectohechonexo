import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorVentaPesificadasComponent } from './contrato-indicador-venta-pesificadas.component';

describe('ContratoIndicadorVentaPesificadasComponent', () => {
  let component: ContratoIndicadorVentaPesificadasComponent;
  let fixture: ComponentFixture<ContratoIndicadorVentaPesificadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorVentaPesificadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorVentaPesificadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
