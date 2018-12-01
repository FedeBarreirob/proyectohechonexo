import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilOperacionesComponent } from './perfil-operaciones.component';

describe('PerfilOperacionesComponent', () => {
  let component: PerfilOperacionesComponent;
  let fixture: ComponentFixture<PerfilOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
