import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosMovimientosDetalleComponent } from './otros-movimientos-detalle.component';

describe('OtrosMovimientosDetalleComponent', () => {
  let component: OtrosMovimientosDetalleComponent;
  let fixture: ComponentFixture<OtrosMovimientosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosMovimientosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosMovimientosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
