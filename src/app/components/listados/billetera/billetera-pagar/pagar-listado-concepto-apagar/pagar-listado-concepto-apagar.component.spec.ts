import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarListadoConceptoAPagarComponent } from './pagar-listado-concepto-apagar.component';

describe('PagarListadoConceptoAPagarComponent', () => {
  let component: PagarListadoConceptoAPagarComponent;
  let fixture: ComponentFixture<PagarListadoConceptoAPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarListadoConceptoAPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarListadoConceptoAPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
