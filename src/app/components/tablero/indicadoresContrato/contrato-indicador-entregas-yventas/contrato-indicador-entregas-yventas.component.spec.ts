import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndicadorEntregasYVentasComponent } from './contrato-indicador-entregas-yventas.component';

describe('ContratoIndicadorEntregasYVentasComponent', () => {
  let component: ContratoIndicadorEntregasYVentasComponent;
  let fixture: ComponentFixture<ContratoIndicadorEntregasYVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndicadorEntregasYVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndicadorEntregasYVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
