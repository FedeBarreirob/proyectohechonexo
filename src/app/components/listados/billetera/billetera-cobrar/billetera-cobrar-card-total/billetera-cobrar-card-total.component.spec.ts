import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarCardTotalComponent } from './billetera-cobrar-card-total.component';

describe('BilleteraCobrarCardTotalComponent', () => {
  let component: BilleteraCobrarCardTotalComponent;
  let fixture: ComponentFixture<BilleteraCobrarCardTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarCardTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarCardTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
