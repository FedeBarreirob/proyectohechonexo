import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarComponent } from './billetera-cobrar.component';

describe('BilleteraCobrarComponent', () => {
  let component: BilleteraCobrarComponent;
  let fixture: ComponentFixture<BilleteraCobrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
