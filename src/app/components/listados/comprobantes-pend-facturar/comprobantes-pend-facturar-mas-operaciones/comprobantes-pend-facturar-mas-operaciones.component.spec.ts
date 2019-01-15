import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarMasOperacionesComponent } from './comprobantes-pend-facturar-mas-operaciones.component';

describe('ComprobantesPendFacturarMasOperacionesComponent', () => {
  let component: ComprobantesPendFacturarMasOperacionesComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
