import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarGeneralComponent } from './tool-bar-general.component';

describe('ToolBarGeneralComponent', () => {
  let component: ToolBarGeneralComponent;
  let fixture: ComponentFixture<ToolBarGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
