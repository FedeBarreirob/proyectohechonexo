import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCteAplicadaDetalleMasOperacionesComponent } from './cta-cte-aplicada-detalle-mas-operaciones.component';

describe('CtaCteAplicadaDetalleMasOperacionesComponent', () => {
  let component: CtaCteAplicadaDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<CtaCteAplicadaDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaCteAplicadaDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaCteAplicadaDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
