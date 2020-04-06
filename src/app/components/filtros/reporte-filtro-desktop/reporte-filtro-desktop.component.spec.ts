import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFiltroDesktopComponent } from './reporte-filtro-desktop.component';

describe('ReporteFiltroDesktopComponent', () => {
  let component: ReporteFiltroDesktopComponent;
  let fixture: ComponentFixture<ReporteFiltroDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteFiltroDesktopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFiltroDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
