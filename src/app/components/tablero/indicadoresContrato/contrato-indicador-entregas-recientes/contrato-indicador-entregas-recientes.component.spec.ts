import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorEntregasRecientesComponent } from './contrato-indicador-entregas-recientes.component';

describe('ContratoIndicadorEntregasRecientesComponent', () => {
  let component: ContratoIndicadorEntregasRecientesComponent;
  let fixture: ComponentFixture<ContratoIndicadorEntregasRecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorEntregasRecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorEntregasRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
