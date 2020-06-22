import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesEdicionComponent } from './perfiles-edicion.component';

describe('PerfilesEdicionComponent', () => {
  let component: PerfilesEdicionComponent;
  let fixture: ComponentFixture<PerfilesEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilesEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilesEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
