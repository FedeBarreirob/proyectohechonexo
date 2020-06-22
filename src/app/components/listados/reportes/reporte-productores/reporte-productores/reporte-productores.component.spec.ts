import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductoresComponent } from './reporte-productores.component';

describe('ReporteProductoresComponent', () => {
  let component: ReporteProductoresComponent;
  let fixture: ComponentFixture<ReporteProductoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteProductoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
