import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaCerradaMultiplesOpcionesComponent } from './cuestionario-respuesta-cerrada-multiples-opciones.component';

describe('CuestionarioRespuestaCerradaMultiplesOpcionesComponent', () => {
  let component: CuestionarioRespuestaCerradaMultiplesOpcionesComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaCerradaMultiplesOpcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaCerradaMultiplesOpcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaCerradaMultiplesOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
