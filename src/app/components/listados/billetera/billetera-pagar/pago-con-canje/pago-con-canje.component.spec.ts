import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConCanjeComponent } from './pago-con-canje.component';

describe('PagoConCanjeComponent', () => {
  let component: PagoConCanjeComponent;
  let fixture: ComponentFixture<PagoConCanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoConCanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConCanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
