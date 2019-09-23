import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteListaDesktopComponent } from './cuenta-corriente-lista-desktop.component';

describe('CuentaCorrienteListaDesktopComponent', () => {
  let component: CuentaCorrienteListaDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
