import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCardInfoComponent } from './billetera-card-info.component';

describe('BilleteraCardInfoComponent', () => {
  let component: BilleteraCardInfoComponent;
  let fixture: ComponentFixture<BilleteraCardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
