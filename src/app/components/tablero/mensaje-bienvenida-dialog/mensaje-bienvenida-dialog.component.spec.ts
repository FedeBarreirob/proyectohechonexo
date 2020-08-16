import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeBienvenidaDialogComponent } from './mensaje-bienvenida-dialog.component';

describe('MensajeBienvenidaDialogComponent', () => {
  let component: MensajeBienvenidaDialogComponent;
  let fixture: ComponentFixture<MensajeBienvenidaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeBienvenidaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeBienvenidaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
