import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnvioRestablecerPasswordComponent } from './modal-envio-restablecer-password.component';

describe('ModalEnvioRestablecerPasswordComponent', () => {
  let component: ModalEnvioRestablecerPasswordComponent;
  let fixture: ComponentFixture<ModalEnvioRestablecerPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEnvioRestablecerPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnvioRestablecerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
