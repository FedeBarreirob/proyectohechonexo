import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaCerradaUnaOpcionComponent } from './cuestionario-respuesta-cerrada-una-opcion.component';

describe('CuestionarioRespuestaCerradaUnaOpcionComponent', () => {
  let component: CuestionarioRespuestaCerradaUnaOpcionComponent;
  let fixture: ComponentFixture<CuestionarioRespuestaCerradaUnaOpcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestaCerradaUnaOpcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioRespuestaCerradaUnaOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
