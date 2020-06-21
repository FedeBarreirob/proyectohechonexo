import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaItemMovilComponent } from './cuenta-corriente-aplicada-item-movil.component';

describe('CuentaCorrienteAplicadaItemMovilComponent', () => {
  let component: CuentaCorrienteAplicadaItemMovilComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaItemMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaItemMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaItemMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
