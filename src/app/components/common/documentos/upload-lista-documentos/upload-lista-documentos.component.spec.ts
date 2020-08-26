import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadListaDocumentosComponent } from './upload-lista-documentos.component';

describe('UploadListaDocumentosComponent', () => {
  let component: UploadListaDocumentosComponent;
  let fixture: ComponentFixture<UploadListaDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadListaDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadListaDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
