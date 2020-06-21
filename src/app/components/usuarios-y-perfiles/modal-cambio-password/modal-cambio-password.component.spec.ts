import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioPasswordComponent } from './modal-cambio-password.component';

describe('ModalCambioPasswordComponent', () => {
  let component: ModalCambioPasswordComponent;
  let fixture: ComponentFixture<ModalCambioPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambioPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambioPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
