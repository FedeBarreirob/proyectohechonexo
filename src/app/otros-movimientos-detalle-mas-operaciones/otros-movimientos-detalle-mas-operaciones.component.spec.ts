import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosMovimientosDetalleMasOperacionesComponent } from './otros-movimientos-detalle-mas-operaciones.component';

describe('OtrosMovimientosDetalleMasOperacionesComponent', () => {
  let component: OtrosMovimientosDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<OtrosMovimientosDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosMovimientosDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosMovimientosDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
