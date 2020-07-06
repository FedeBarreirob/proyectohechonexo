import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTotalPagoComponent } from './resumen-total-pago.component';

describe('ResumenTotalPagoComponent', () => {
  let component: ResumenTotalPagoComponent;
  let fixture: ComponentFixture<ResumenTotalPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenTotalPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenTotalPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
