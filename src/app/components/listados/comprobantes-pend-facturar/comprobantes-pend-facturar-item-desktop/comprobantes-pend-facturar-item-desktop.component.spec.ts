import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesPendFacturarItemDesktopComponent } from './comprobantes-pend-facturar-item-desktop.component';

describe('ComprobantesPendFacturarItemDesktopComponent', () => {
  let component: ComprobantesPendFacturarItemDesktopComponent;
  let fixture: ComponentFixture<ComprobantesPendFacturarItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesPendFacturarItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesPendFacturarItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
