import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRegistroDefinirCuentaComponent } from './inicio-registro-definir-cuenta.component';

describe('InicioRegistroDefinirCuentaComponent', () => {
  let component: InicioRegistroDefinirCuentaComponent;
  let fixture: ComponentFixture<InicioRegistroDefinirCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRegistroDefinirCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRegistroDefinirCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
