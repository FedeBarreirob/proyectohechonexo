import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoConDiferenciaDeCamioEIvaComponent } from './saldo-con-diferencia-de-camio-eiva.component';

describe('SaldoConDiferenciaDeCamioEIvaComponent', () => {
  let component: SaldoConDiferenciaDeCamioEIvaComponent;
  let fixture: ComponentFixture<SaldoConDiferenciaDeCamioEIvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoConDiferenciaDeCamioEIvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoConDiferenciaDeCamioEIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
