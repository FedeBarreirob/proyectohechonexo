import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaListaDesktopComponent } from './cuenta-corriente-aplicada-lista-desktop.component';

describe('CuentaCorrienteAplicadaListaDesktopComponent', () => {
  let component: CuentaCorrienteAplicadaListaDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
