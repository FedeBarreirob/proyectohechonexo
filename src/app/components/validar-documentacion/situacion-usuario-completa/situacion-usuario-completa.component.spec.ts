import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionUsuarioCompletaComponent } from './situacion-usuario-completa.component';

describe('SituacionUsuarioCompletaComponent', () => {
  let component: SituacionUsuarioCompletaComponent;
  let fixture: ComponentFixture<SituacionUsuarioCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacionUsuarioCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionUsuarioCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
