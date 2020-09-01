import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaDetalleDesktopComponent } from './cuenta-corriente-aplicada-detalle-desktop.component';

describe('CuentaCorrienteAplicadaDetalleDesktopComponent', () => {
  let component: CuentaCorrienteAplicadaDetalleDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
