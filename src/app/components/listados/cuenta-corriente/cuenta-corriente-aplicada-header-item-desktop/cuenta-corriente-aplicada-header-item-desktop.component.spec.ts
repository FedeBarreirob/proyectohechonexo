import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaHeaderItemDesktopComponent } from './cuenta-corriente-aplicada-header-item-desktop.component';

describe('CuentaCorrienteAplicadaHeaderItemDesktopComponent', () => {
  let component: CuentaCorrienteAplicadaHeaderItemDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
