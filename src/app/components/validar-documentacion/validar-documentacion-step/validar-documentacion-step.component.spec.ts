import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDocumentacionStepComponent } from './validar-documentacion-step.component';

describe('ValidarDocumentacionStepComponent', () => {
  let component: ValidarDocumentacionStepComponent;
  let fixture: ComponentFixture<ValidarDocumentacionStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDocumentacionStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDocumentacionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
