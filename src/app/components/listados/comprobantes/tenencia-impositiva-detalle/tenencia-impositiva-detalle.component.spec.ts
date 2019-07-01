import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenenciaImpositivaDetalleComponent } from './tenencia-impositiva-detalle.component';

describe('TenenciaImpositivaDetalleComponent', () => {
  let component: TenenciaImpositivaDetalleComponent;
  let fixture: ComponentFixture<TenenciaImpositivaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenenciaImpositivaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenenciaImpositivaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
