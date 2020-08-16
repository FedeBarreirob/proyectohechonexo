import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressUploadFilesComponent } from './progress-upload-files.component';

describe('ProgressUploadFilesComponent', () => {
  let component: ProgressUploadFilesComponent;
  let fixture: ComponentFixture<ProgressUploadFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressUploadFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
