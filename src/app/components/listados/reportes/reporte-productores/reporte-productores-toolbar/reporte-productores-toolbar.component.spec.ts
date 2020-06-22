import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductoresToolbarComponent } from './reporte-productores-toolbar.component';

describe('ReporteProductoresToolbarComponent', () => {
  let component: ReporteProductoresToolbarComponent;
  let fixture: ComponentFixture<ReporteProductoresToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteProductoresToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductoresToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
