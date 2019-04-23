import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerealesFiltroComponent } from './cereales-filtro.component';

describe('CerealesFiltroComponent', () => {
  let component: CerealesFiltroComponent;
  let fixture: ComponentFixture<CerealesFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerealesFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerealesFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
