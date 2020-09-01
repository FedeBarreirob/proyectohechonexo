import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoTercerosEdicionDesktopComponent } from './acceso-terceros-edicion-desktop.component';

describe('AccesoTercerosEdicionDesktopComponent', () => {
  let component: AccesoTercerosEdicionDesktopComponent;
  let fixture: ComponentFixture<AccesoTercerosEdicionDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoTercerosEdicionDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoTercerosEdicionDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
