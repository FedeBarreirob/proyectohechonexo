import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacteAplicadaDetalleComponent } from './ctacte-aplicada-detalle.component';

describe('CtacteAplicadaDetalleComponent', () => {
  let component: CtacteAplicadaDetalleComponent;
  let fixture: ComponentFixture<CtacteAplicadaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtacteAplicadaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacteAplicadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
