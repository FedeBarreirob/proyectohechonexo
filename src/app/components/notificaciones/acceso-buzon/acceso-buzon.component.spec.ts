import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoBuzonComponent } from './acceso-buzon.component';

describe('AccesoBuzonComponent', () => {
  let component: AccesoBuzonComponent;
  let fixture: ComponentFixture<AccesoBuzonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoBuzonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoBuzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
