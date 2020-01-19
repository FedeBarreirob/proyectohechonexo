import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPendienteDetalleComponent } from './insumo-pendiente-detalle.component';

describe('InsumoPendienteDetalleComponent', () => {
  let component: InsumoPendienteDetalleComponent;
  let fixture: ComponentFixture<InsumoPendienteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsumoPendienteDetalleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoPendienteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
