import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUsuariosToolbarComponent } from './reporte-usuarios-toolbar.component';

describe('ReporteUsuariosToolbarComponent', () => {
  let component: ReporteUsuariosToolbarComponent;
  let fixture: ComponentFixture<ReporteUsuariosToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteUsuariosToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteUsuariosToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
