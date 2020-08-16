import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarRegistroDialogComponent } from './completar-registro-dialog.component';

describe('CompletarRegistroDialogComponent', () => {
  let component: CompletarRegistroDialogComponent;
  let fixture: ComponentFixture<CompletarRegistroDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletarRegistroDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarRegistroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
