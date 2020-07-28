import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenResumenComprobanteAPagarItemComponent } from './resumen-resumen-comprobante-apagar-item.component';

describe('ResumenResumenComprobanteAPagarItemComponent', () => {
  let component: ResumenResumenComprobanteAPagarItemComponent;
  let fixture: ComponentFixture<ResumenResumenComprobanteAPagarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenResumenComprobanteAPagarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenResumenComprobanteAPagarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
