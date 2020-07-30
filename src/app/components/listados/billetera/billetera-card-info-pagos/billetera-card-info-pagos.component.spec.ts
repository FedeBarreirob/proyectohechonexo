import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCardInfoPagosComponent } from './billetera-card-info-pagos.component';

describe('BilleteraCardInfoPagosComponent', () => {
  let component: BilleteraCardInfoPagosComponent;
  let fixture: ComponentFixture<BilleteraCardInfoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCardInfoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCardInfoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
