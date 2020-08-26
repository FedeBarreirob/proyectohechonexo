import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadListaDocumentosProgressComponent } from './upload-lista-documentos-progress.component';

describe('UploadListaDocumentosProgressComponent', () => {
  let component: UploadListaDocumentosProgressComponent;
  let fixture: ComponentFixture<UploadListaDocumentosProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadListaDocumentosProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadListaDocumentosProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
