import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaAbiertaDolaresComponent } from './cuestionario-respuesta-abierta-dolares.component';

describe('CuestionarioRespuestaAbiertaDolaresComponent', () => {
  let component: CuestionarioRespuestaAbiertaDolaresComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaAbiertaDolaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaAbiertaDolaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaAbiertaDolaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
