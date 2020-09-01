import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaLegajoUploadDocumentoComponent } from './apertura-legajo-upload-documento.component';

describe('AperturaLegajoUploadDocumentoComponent', () => {
  let component: AperturaLegajoUploadDocumentoComponent;
  let fixture: ComponentFixture<AperturaLegajoUploadDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturaLegajoUploadDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturaLegajoUploadDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
