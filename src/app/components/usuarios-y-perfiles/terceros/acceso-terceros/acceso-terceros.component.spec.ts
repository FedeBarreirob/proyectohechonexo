import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoTercerosComponent } from './acceso-terceros.component';

describe('AccesoTercerosComponent', () => {
  let component: AccesoTercerosComponent;
  let fixture: ComponentFixture<AccesoTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
