import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarCardComponent } from './billetera-cobrar-card.component';

describe('BilleteraCobrarCardComponent', () => {
  let component: BilleteraCobrarCardComponent;
  let fixture: ComponentFixture<BilleteraCobrarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
