import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDePerfilDesktopComponent } from './informacion-de-perfil-desktop.component';

describe('InformacionDePerfilDesktopComponent', () => {
  let component: InformacionDePerfilDesktopComponent;
  let fixture: ComponentFixture<InformacionDePerfilDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionDePerfilDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDePerfilDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
