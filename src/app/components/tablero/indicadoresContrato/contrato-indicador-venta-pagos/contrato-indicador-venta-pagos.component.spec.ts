import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorVentaPagosComponent } from './contrato-indicador-venta-pagos.component';

describe('ContratoIndicadorVentaPagosComponent', () => {
  let component: ContratoIndicadorVentaPagosComponent;
  let fixture: ComponentFixture<ContratoIndicadorVentaPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorVentaPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorVentaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
