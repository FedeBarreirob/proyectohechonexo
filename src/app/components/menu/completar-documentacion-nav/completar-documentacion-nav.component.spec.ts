import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarDocumentacionNavComponent } from './completar-documentacion-nav.component';

describe('CompletarDocumentacionNavComponent', () => {
  let component: CompletarDocumentacionNavComponent;
  let fixture: ComponentFixture<CompletarDocumentacionNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletarDocumentacionNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarDocumentacionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
