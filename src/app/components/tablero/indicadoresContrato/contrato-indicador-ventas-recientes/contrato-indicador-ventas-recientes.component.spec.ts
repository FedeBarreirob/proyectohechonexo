import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorVentasRecientesComponent } from './contrato-indicador-ventas-recientes.component';

describe('ContratoIndicadorVentasRecientesComponent', () => {
  let component: ContratoIndicadorVentasRecientesComponent;
  let fixture: ComponentFixture<ContratoIndicadorVentasRecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorVentasRecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorVentasRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
