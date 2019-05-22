import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteDetalleComponent } from './cuenta-corriente-detalle.component';

describe('CuentaCorrienteDetalleComponent', () => {
  let component: CuentaCorrienteDetalleComponent;
  let fixture: ComponentFixture<CuentaCorrienteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
