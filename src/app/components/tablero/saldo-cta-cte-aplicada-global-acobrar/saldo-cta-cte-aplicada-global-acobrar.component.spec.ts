import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCtaCteAplicadaGlobalACobrarComponent } from './saldo-cta-cte-aplicada-global-acobrar.component';

describe('SaldoCtaCteAplicadaGlobalACobrarComponent', () => {
  let component: SaldoCtaCteAplicadaGlobalACobrarComponent;
  let fixture: ComponentFixture<SaldoCtaCteAplicadaGlobalACobrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoCtaCteAplicadaGlobalACobrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCtaCteAplicadaGlobalACobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
