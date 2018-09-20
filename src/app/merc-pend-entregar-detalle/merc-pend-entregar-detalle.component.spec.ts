import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarDetalleComponent } from './merc-pend-entregar-detalle.component';

describe('MercPendEntregarDetalleComponent', () => {
  let component: MercPendEntregarDetalleComponent;
  let fixture: ComponentFixture<MercPendEntregarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
