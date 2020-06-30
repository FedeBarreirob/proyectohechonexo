import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SojaDialogComponent } from './soja-dialog.component';

describe('SojaDialogComponent', () => {
  let component: SojaDialogComponent;
  let fixture: ComponentFixture<SojaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SojaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SojaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
