import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDePerfilComponent } from './informacion-de-perfil.component';

describe('InformacionDePerfilComponent', () => {
  let component: InformacionDePerfilComponent;
  let fixture: ComponentFixture<InformacionDePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionDePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
