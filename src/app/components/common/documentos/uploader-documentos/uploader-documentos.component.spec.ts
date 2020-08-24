import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderDocumentosComponent } from './uploader-documentos.component';

describe('UploaderDocumentosComponent', () => {
  let component: UploaderDocumentosComponent;
  let fixture: ComponentFixture<UploaderDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
