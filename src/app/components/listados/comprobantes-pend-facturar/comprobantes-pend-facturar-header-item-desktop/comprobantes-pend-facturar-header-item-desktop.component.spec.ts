import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarHeaderItemDesktopComponent } from './comprobantes-pend-facturar-header-item-desktop.component';

describe('ComprobantesPendFacturarHeaderItemDesktopComponent', () => {
  let component: ComprobantesPendFacturarHeaderItemDesktopComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobantesPendFacturarHeaderItemDesktopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
