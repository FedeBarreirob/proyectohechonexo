import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosDeGranosComponent } from './precios-de-granos.component';

describe('PreciosDeGranosComponent', () => {
  let component: PreciosDeGranosComponent;
  let fixture: ComponentFixture<PreciosDeGranosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciosDeGranosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosDeGranosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
