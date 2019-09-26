import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPerfilEdicionDesktopComponent } from './info-perfil-edicion-desktop.component';

describe('InfoPerfilEdicionDesktopComponent', () => {
  let component: InfoPerfilEdicionDesktopComponent;
  let fixture: ComponentFixture<InfoPerfilEdicionDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPerfilEdicionDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPerfilEdicionDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
