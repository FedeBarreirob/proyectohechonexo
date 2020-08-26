import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentoGenericoComponent } from './upload-documento-generico.component';

describe('UploadDocumentoGenericoComponent', () => {
  let component: UploadDocumentoGenericoComponent;
  let fixture: ComponentFixture<UploadDocumentoGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocumentoGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
