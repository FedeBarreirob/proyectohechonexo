import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConCanjeDisponibleComponent } from './pago-con-canje-disponible.component';

describe('PagoConCanjeDisponibleComponent', () => {
  let component: PagoConCanjeDisponibleComponent;
  let fixture: ComponentFixture<PagoConCanjeDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoConCanjeDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConCanjeDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
