import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoEntregasDetalleComponent } from './contrato-entregas-detalle.component';

describe('ContratoEntregasDetalleComponent', () => {
  let component: ContratoEntregasDetalleComponent;
  let fixture: ComponentFixture<ContratoEntregasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoEntregasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoEntregasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
