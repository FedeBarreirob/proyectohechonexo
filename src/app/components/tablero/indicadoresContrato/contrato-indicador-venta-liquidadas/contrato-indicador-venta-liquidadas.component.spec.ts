import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorVentaLiquidadasComponent } from './contrato-indicador-venta-liquidadas.component';

describe('ContratoIndicadorVentaLiquidadasComponent', () => {
  let component: ContratoIndicadorVentaLiquidadasComponent;
  let fixture: ComponentFixture<ContratoIndicadorVentaLiquidadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorVentaLiquidadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorVentaLiquidadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
