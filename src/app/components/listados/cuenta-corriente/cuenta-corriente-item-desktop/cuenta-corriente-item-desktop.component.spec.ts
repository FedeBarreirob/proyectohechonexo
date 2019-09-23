import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteItemDesktopComponent } from './cuenta-corriente-item-desktop.component';

describe('CuentaCorrienteItemDesktopComponent', () => {
  let component: CuentaCorrienteItemDesktopComponent;
  let fixture: ComponentFixture<CuentaCorrienteItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
