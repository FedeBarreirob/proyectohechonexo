import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaAbiertaEnteroComponent } from './cuestionario-respuesta-abierta-entero.component';

describe('CuestionarioRespuestaAbiertaEnteroComponent', () => {
  let component: CuestionarioRespuestaAbiertaEnteroComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaAbiertaEnteroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaAbiertaEnteroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaAbiertaEnteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
