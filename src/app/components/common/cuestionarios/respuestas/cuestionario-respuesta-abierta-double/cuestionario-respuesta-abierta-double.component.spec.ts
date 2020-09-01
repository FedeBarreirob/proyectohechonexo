import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaAbiertaDoubleComponent } from './cuestionario-respuesta-abierta-double.component';

describe('CuestionarioRespuestaAbiertaDoubleComponent', () => {
  let component: CuestionarioRespuestaAbiertaDoubleComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaAbiertaDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaAbiertaDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaAbiertaDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
