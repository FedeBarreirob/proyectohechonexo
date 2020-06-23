import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarListadoCardPesosComponent } from './pagar-listado-card-pesos.component';

describe('PagarListadoCardPesosComponent', () => {
  let component: PagarListadoCardPesosComponent;
  let fixture: ComponentFixture<PagarListadoCardPesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarListadoCardPesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarListadoCardPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
