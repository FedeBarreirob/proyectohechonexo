import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTipoPagoComponent } from './resumen-tipo-pago.component';

describe('ResumenTipoPagoComponent', () => {
  let component: ResumenTipoPagoComponent;
  let fixture: ComponentFixture<ResumenTipoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenTipoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
