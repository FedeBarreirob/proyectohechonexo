import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarDetalleComponent } from './comprobantes-pend-facturar-detalle.component';

describe('ComprobantesPendFacturarDetalleComponent', () => {
  let component: ComprobantesPendFacturarDetalleComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
