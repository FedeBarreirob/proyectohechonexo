import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarDocumentacionCardComponent } from './completar-documentacion-card.component';

describe('CompletarDocumentacionCardComponent', () => {
  let component: CompletarDocumentacionCardComponent;
  let fixture: ComponentFixture<CompletarDocumentacionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletarDocumentacionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarDocumentacionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
