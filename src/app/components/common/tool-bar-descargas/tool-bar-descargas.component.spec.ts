import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarDescargasComponent } from './tool-bar-descargas.component';

describe('ToolBarDescargasComponent', () => {
  let component: ToolBarDescargasComponent;
  let fixture: ComponentFixture<ToolBarDescargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarDescargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarDescargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
