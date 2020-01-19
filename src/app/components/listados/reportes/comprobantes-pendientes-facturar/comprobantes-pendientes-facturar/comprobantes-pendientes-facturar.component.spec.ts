import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendientesFacturarComponent } from './comprobantes-pendientes-facturar.component';

describe('ComprobantesPendientesFacturarComponent', () => {
  let component: ComprobantesPendientesFacturarComponent;
  let fixture: ComponentFixture<ComprobantesPendientesFacturarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobantesPendientesFacturarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendientesFacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
