import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaSaldoComponent } from './cuenta-corriente-aplicada-saldo.component';

describe('CuentaCorrienteAplicadaSaldoComponent', () => {
  let component: CuentaCorrienteAplicadaSaldoComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
