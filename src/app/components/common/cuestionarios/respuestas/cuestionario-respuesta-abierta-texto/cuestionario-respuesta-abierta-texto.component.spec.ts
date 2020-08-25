import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaAbiertaTextoComponent } from './cuestionario-respuesta-abierta-texto.component';

describe('CuestionarioRespuestaAbiertaTextoComponent', () => {
  let component: CuestionarioRespuestaAbiertaTextoComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaAbiertaTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaAbiertaTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaAbiertaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
