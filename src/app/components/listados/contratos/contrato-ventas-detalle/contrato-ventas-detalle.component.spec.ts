import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoVentasDetalleComponent } from './contrato-ventas-detalle.component';

describe('ContratoVentasDetalleComponent', () => {
  let component: ContratoVentasDetalleComponent;
  let fixture: ComponentFixture<ContratoVentasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoVentasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoVentasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
