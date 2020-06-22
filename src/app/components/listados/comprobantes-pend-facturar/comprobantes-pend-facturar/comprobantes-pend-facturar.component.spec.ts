import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarComponent } from './comprobantes-pend-facturar.component';

describe('ComprobantesPendFacturarComponent', () => {
  let component: ComprobantesPendFacturarComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
