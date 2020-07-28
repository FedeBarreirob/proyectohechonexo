import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeSolicitudesListadoItemComponent } from './gestion-de-solicitudes-listado-item.component';

describe('GestionDeSolicitudesListadoItemComponent', () => {
  let component: GestionDeSolicitudesListadoItemComponent;
  let fixture: ComponentFixture<GestionDeSolicitudesListadoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeSolicitudesListadoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeSolicitudesListadoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
