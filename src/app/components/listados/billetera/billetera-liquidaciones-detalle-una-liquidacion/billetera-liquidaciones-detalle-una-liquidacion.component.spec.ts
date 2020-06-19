import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraLiquidacionesDetalleUnaLiquidacionComponent } from './billetera-liquidaciones-detalle-una-liquidacion.component';

describe('BilleteraLiquidacionesDetalleUnaLiquidacionComponent', () => {
  let component: BilleteraLiquidacionesDetalleUnaLiquidacionComponent;
  let fixture: ComponentFixture<BilleteraLiquidacionesDetalleUnaLiquidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraLiquidacionesDetalleUnaLiquidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraLiquidacionesDetalleUnaLiquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
