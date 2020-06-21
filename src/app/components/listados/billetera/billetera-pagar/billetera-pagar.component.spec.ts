import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraPagarComponent } from './billetera-pagar.component';

describe('BilleteraPagarComponent', () => {
  let component: BilleteraPagarComponent;
  let fixture: ComponentFixture<BilleteraPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
