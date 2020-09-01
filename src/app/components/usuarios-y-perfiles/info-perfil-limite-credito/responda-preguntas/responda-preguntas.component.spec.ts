import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondaPreguntasComponent } from './responda-preguntas.component';

describe('RespondaPreguntasComponent', () => {
  let component: RespondaPreguntasComponent;
  let fixture: ComponentFixture<RespondaPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondaPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
