import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRegistroConfirmacionMailComponent } from './inicio-registro-confirmacion-mail.component';

describe('InicioRegistroConfirmacionMailComponent', () => {
  let component: InicioRegistroConfirmacionMailComponent;
  let fixture: ComponentFixture<InicioRegistroConfirmacionMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRegistroConfirmacionMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRegistroConfirmacionMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
