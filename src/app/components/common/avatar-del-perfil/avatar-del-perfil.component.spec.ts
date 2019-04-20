import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDelPerfilComponent } from './avatar-del-perfil.component';

describe('AvatarDelPerfilComponent', () => {
  let component: AvatarDelPerfilComponent;
  let fixture: ComponentFixture<AvatarDelPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarDelPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDelPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
