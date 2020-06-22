import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteDetalleDesktopComponent } from './cuenta-corriente-detalle-desktop.component';

describe('CuentaCorrienteDetalleDesktopComponent', () => {
  let component: CuentaCorrienteDetalleDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
