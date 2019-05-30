import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPerfilCambioPasswordComponent } from './info-perfil-cambio-password.component';

describe('InfoPerfilCambioPasswordComponent', () => {
  let component: InfoPerfilCambioPasswordComponent;
  let fixture: ComponentFixture<InfoPerfilCambioPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPerfilCambioPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPerfilCambioPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
