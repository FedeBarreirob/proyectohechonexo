import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorGraficoPorcentualComponent } from './contrato-indicador-grafico-porcentual.component';

describe('ContratoIndicadorGraficoPorcentualComponent', () => {
  let component: ContratoIndicadorGraficoPorcentualComponent;
  let fixture: ComponentFixture<ContratoIndicadorGraficoPorcentualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorGraficoPorcentualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorGraficoPorcentualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
