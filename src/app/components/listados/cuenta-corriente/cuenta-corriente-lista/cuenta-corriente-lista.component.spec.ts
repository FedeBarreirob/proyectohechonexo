import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteListaComponent } from './cuenta-corriente-lista.component';

describe('CuentaCorrienteListaComponent', () => {
  let component: CuentaCorrienteListaComponent;
  let fixture: ComponentFixture<CuentaCorrienteListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
