import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRegistroComponent } from './inicio-registro.component';

describe('InicioRegistroComponent', () => {
  let component: InicioRegistroComponent;
  let fixture: ComponentFixture<InicioRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
