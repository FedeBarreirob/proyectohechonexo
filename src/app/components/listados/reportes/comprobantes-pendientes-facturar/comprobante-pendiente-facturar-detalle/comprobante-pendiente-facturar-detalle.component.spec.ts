import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantePendienteFacturarDetalleComponent } from './comprobante-pendiente-facturar-detalle.component';

describe('ComprobantePendienteFacturarDetalleComponent', () => {
  let component: ComprobantePendienteFacturarDetalleComponent;
  let fixture: ComponentFixture<ComprobantePendienteFacturarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobantePendienteFacturarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantePendienteFacturarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
