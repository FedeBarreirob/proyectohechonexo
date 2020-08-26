import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioPreguntaConRespuestaComponent } from './cuestionario-pregunta-con-respuesta.component';

describe('CuestionarioPreguntaConRespuestaComponent', () => {
  let component: CuestionarioPreguntaConRespuestaComponent;
  let fixture: ComponentFixture<CuestionarioPreguntaConRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioPreguntaConRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioPreguntaConRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
