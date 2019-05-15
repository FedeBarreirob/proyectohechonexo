import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCtaCteAplicadaGlobalComponent } from './saldo-cta-cte-aplicada-global.component';

describe('SaldoCtaCteAplicadaGlobalComponent', () => {
  let component: SaldoCtaCteAplicadaGlobalComponent;
  let fixture: ComponentFixture<SaldoCtaCteAplicadaGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoCtaCteAplicadaGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCtaCteAplicadaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
