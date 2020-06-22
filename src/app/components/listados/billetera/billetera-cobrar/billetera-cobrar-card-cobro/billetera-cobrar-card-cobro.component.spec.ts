import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarCardCobroComponent } from './billetera-cobrar-card-cobro.component';

describe('BilleteraCobrarCardCobroComponent', () => {
  let component: BilleteraCobrarCardCobroComponent;
  let fixture: ComponentFixture<BilleteraCobrarCardCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarCardCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarCardCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
