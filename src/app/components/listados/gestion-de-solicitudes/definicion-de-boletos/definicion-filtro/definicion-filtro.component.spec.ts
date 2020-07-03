import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionFiltroComponent } from './definicion-filtro.component';

describe('DefinicionFiltroComponent', () => {
  let component: DefinicionFiltroComponent;
  let fixture: ComponentFixture<DefinicionFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
