import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarListComponent } from './billetera-cobrar-list.component';

describe('BilleteraCobrarListComponent', () => {
  let component: BilleteraCobrarListComponent;
  let fixture: ComponentFixture<BilleteraCobrarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
