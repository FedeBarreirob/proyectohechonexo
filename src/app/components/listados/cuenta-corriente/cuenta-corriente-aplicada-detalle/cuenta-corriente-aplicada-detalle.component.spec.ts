import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaDetalleComponent } from './cuenta-corriente-aplicada-detalle.component';

describe('CuentaCorrienteAplicadaDetalleComponent', () => {
  let component: CuentaCorrienteAplicadaDetalleComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
