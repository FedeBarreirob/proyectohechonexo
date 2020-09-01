import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCanjeInfoComponent } from './pagar-canje-info.component';

describe('PagarCanjeInfoComponent', () => {
  let component: PagarCanjeInfoComponent;
  let fixture: ComponentFixture<PagarCanjeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarCanjeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarCanjeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
