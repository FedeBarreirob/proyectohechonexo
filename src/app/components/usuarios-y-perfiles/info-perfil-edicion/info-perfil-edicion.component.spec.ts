import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPerfilEdicionComponent } from './info-perfil-edicion.component';

describe('InfoPerfilEdicionComponent', () => {
  let component: InfoPerfilEdicionComponent;
  let fixture: ComponentFixture<InfoPerfilEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPerfilEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPerfilEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
