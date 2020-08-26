import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaAbiertaPesosComponent } from './cuestionario-respuesta-abierta-pesos.component';

describe('CuestionarioRespuestaAbiertaPesosComponent', () => {
  let component: CuestionarioRespuestaAbiertaPesosComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaAbiertaPesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaAbiertaPesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaAbiertaPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
