import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarListadoCardDolaresComponent } from './pagar-listado-card-dolares.component';

describe('PagarListadoCardDolaresComponent', () => {
  let component: PagarListadoCardDolaresComponent;
  let fixture: ComponentFixture<PagarListadoCardDolaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarListadoCardDolaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarListadoCardDolaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
