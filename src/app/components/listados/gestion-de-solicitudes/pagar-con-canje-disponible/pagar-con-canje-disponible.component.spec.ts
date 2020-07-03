import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarConCanjeDisponibleComponent } from './pagar-con-canje-disponible.component';

describe('PagarConCanjeDisponibleComponent', () => {
  let component: PagarConCanjeDisponibleComponent;
  let fixture: ComponentFixture<PagarConCanjeDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarConCanjeDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarConCanjeDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
