import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoTcComponent } from './saldo-tc.component';

describe('SaldoTcComponent', () => {
  let component: SaldoTcComponent;
  let fixture: ComponentFixture<SaldoTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
