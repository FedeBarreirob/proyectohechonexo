import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorVentaComponent } from './contrato-indicador-venta.component';

describe('ContratoIndicadorVentaComponent', () => {
  let component: ContratoIndicadorVentaComponent;
  let fixture: ComponentFixture<ContratoIndicadorVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
