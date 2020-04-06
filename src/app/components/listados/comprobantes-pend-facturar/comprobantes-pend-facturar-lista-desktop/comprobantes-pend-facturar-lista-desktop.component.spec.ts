import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarListaDesktopComponent } from './comprobantes-pend-facturar-lista-desktop.component';

describe('ComprobantesPendFacturarListaDesktopComponent', () => {
  let component: ComprobantesPendFacturarListaDesktopComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
