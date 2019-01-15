import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasDetalleMasOperacionesComponent } from './ventas-detalle-mas-operaciones.component';

describe('VentasDetalleMasOperacionesComponent', () => {
  let component: VentasDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<VentasDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
