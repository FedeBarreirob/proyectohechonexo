import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteHeaderItemDesktopComponent } from './cuenta-corriente-header-item-desktop.component';

describe('CuentaCorrienteHeaderItemDesktopComponent', () => {
  let component: CuentaCorrienteHeaderItemDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
