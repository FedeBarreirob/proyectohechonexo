import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaItemDesktopComponent } from './cuenta-corriente-aplicada-item-desktop.component';

describe('CuentaCorrienteAplicadaItemDesktopComponent', () => {
  let component: CuentaCorrienteAplicadaItemDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
