import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraLiquidacionesDetalleComponent } from './billetera-liquidaciones-detalle.component';

describe('BilleteraLiquidacionesDetalleComponent', () => {
  let component: BilleteraLiquidacionesDetalleComponent;
  let fixture: ComponentFixture<BilleteraLiquidacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraLiquidacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraLiquidacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
