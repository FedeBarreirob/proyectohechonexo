import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAplicadaListaComponent } from './cuenta-corriente-aplicada-lista.component';

describe('CuentaCorrienteAplicadaListaComponent', () => {
  let component: CuentaCorrienteAplicadaListaComponent;
  let fixture: ComponentFixture<CuentaCorrienteAplicadaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAplicadaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAplicadaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
