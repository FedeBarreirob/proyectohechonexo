import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraOperacionesItemComponent } from './billetera-operaciones-item.component';

describe('BilleteraOperacionesItemComponent', () => {
  let component: BilleteraOperacionesItemComponent;
  let fixture: ComponentFixture<BilleteraOperacionesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraOperacionesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraOperacionesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
