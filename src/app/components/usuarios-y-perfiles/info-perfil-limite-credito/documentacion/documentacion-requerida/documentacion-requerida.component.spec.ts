import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionRequeridaComponent } from './documentacion-requerida.component';

describe('DocumentacionRequeridaComponent', () => {
  let component: DocumentacionRequeridaComponent;
  let fixture: ComponentFixture<DocumentacionRequeridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionRequeridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionRequeridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
