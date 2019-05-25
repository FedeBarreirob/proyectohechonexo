import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCosechaComponent } from './filtro-cosecha.component';

describe('FiltroCosechaComponent', () => {
  let component: FiltroCosechaComponent;
  let fixture: ComponentFixture<FiltroCosechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCosechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
