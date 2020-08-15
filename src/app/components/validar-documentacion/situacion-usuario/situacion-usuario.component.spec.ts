import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionUsuarioComponent } from './situacion-usuario.component';

describe('SituacionUsuarioComponent', () => {
  let component: SituacionUsuarioComponent;
  let fixture: ComponentFixture<SituacionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
