import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoTercerosOperacionesComponent } from './acceso-terceros-operaciones.component';

describe('AccesoTercerosOperacionesComponent', () => {
  let component: AccesoTercerosOperacionesComponent;
  let fixture: ComponentFixture<AccesoTercerosOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoTercerosOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoTercerosOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
