import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaTuPerfilDesktopComponent } from './edita-tu-perfil-desktop.component';

describe('EditaTuPerfilDesktopComponent', () => {
  let component: EditaTuPerfilDesktopComponent;
  let fixture: ComponentFixture<EditaTuPerfilDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaTuPerfilDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaTuPerfilDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
