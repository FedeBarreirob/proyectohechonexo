import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarDetalleMasOperacionesComponent } from './comprobantes-pend-facturar-detalle-mas-operaciones.component';

describe('ComprobantesPendFacturarDetalleMasOperacionesComponent', () => {
  let component: ComprobantesPendFacturarDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
