import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeSolicitudesComponent } from './gestion-de-solicitudes.component';

describe('GestionDeSolicitudesComponent', () => {
  let component: GestionDeSolicitudesComponent;
  let fixture: ComponentFixture<GestionDeSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
