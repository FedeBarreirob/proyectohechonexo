import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacteMasOperacionesComponent } from './ctacte-mas-operaciones.component';

describe('CtacteMasOperacionesComponent', () => {
  let component: CtacteMasOperacionesComponent;
  let fixture: ComponentFixture<CtacteMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtacteMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacteMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
