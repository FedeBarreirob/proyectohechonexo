import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeSolicitudesListadoComponent } from './gestion-de-solicitudes-listado.component';

describe('GestionDeSolicitudesListadoComponent', () => {
  let component: GestionDeSolicitudesListadoComponent;
  let fixture: ComponentFixture<GestionDeSolicitudesListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeSolicitudesListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeSolicitudesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
