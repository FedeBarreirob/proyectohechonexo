import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCtaCteAplicadaGlobalAPagarComponent } from './saldo-cta-cte-aplicada-global-apagar.component';

describe('SaldoCtaCteAplicadaGlobalAPagarComponent', () => {
  let component: SaldoCtaCteAplicadaGlobalAPagarComponent;
  let fixture: ComponentFixture<SaldoCtaCteAplicadaGlobalAPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoCtaCteAplicadaGlobalAPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCtaCteAplicadaGlobalAPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
