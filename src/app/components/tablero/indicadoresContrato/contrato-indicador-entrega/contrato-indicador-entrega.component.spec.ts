import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorEntregaComponent } from './contrato-indicador-entrega.component';

describe('ContratoIndicadorEntregaComponent', () => {
  let component: ContratoIndicadorEntregaComponent;
  let fixture: ComponentFixture<ContratoIndicadorEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
