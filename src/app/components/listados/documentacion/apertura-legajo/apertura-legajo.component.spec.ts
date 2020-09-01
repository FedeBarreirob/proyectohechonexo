import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaLegajoComponent } from './apertura-legajo.component';

describe('AperturaLegajoComponent', () => {
  let component: AperturaLegajoComponent;
  let fixture: ComponentFixture<AperturaLegajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturaLegajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturaLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
