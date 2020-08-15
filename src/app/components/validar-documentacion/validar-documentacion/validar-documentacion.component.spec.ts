import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDocumentacionComponent } from './validar-documentacion.component';

describe('ValidarDocumentacionComponent', () => {
  let component: ValidarDocumentacionComponent;
  let fixture: ComponentFixture<ValidarDocumentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDocumentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
