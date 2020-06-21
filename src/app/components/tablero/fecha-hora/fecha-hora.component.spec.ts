import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaHoraComponent } from './fecha-hora.component';

describe('FechaHoraComponent', () => {
  let component: FechaHoraComponent;
  let fixture: ComponentFixture<FechaHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechaHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
