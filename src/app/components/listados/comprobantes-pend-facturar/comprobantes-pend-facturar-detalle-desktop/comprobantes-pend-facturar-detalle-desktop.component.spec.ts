import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarDetalleDesktopComponent } from './comprobantes-pend-facturar-detalle-desktop.component';

describe('ComprobantesPendFacturarDetalleDesktopComponent', () => {
  let component: ComprobantesPendFacturarDetalleDesktopComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
