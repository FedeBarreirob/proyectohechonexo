import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoTercerosEdicionComponent } from './acceso-terceros-edicion.component';

describe('AccesoTercerosEdicionComponent', () => {
  let component: AccesoTercerosEdicionComponent;
  let fixture: ComponentFixture<AccesoTercerosEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoTercerosEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoTercerosEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
