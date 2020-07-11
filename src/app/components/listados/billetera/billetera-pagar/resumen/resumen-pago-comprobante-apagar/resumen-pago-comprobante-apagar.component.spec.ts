import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPagoComprobanteAPagarComponent } from './resumen-pago-comprobante-apagar.component';

describe('ResumenPagoComprobanteAPagarComponent', () => {
  let component: ResumenPagoComprobanteAPagarComponent;
  let fixture: ComponentFixture<ResumenPagoComprobanteAPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenPagoComprobanteAPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPagoComprobanteAPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
