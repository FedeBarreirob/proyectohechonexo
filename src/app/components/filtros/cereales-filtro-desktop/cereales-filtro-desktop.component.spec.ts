import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerealesFiltroDesktopComponent } from './cereales-filtro-desktop.component';

describe('CerealesFiltroDesktopComponent', () => {
  let component: CerealesFiltroDesktopComponent;
  let fixture: ComponentFixture<CerealesFiltroDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerealesFiltroDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerealesFiltroDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
