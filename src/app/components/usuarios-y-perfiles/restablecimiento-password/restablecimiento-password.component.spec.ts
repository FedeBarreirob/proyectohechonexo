import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecimientoPasswordComponent } from './restablecimiento-password.component';

describe('RestablecimientoPasswordComponent', () => {
  let component: RestablecimientoPasswordComponent;
  let fixture: ComponentFixture<RestablecimientoPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecimientoPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecimientoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
