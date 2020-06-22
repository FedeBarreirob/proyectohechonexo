import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraSaldoMovilComponent } from './billetera-saldo-movil.component';

describe('BilleteraSaldoMovilComponent', () => {
  let component: BilleteraSaldoMovilComponent;
  let fixture: ComponentFixture<BilleteraSaldoMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraSaldoMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraSaldoMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
