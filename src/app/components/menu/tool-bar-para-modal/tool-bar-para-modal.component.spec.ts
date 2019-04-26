import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarParaModalComponent } from './tool-bar-para-modal.component';

describe('ToolBarParaModalComponent', () => {
  let component: ToolBarParaModalComponent;
  let fixture: ComponentFixture<ToolBarParaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarParaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarParaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
