import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarDetalleMasOperacionesComponent } from './merc-pend-entregar-detalle-mas-operaciones.component';

describe('MercPendEntregarDetalleMasOperacionesComponent', () => {
  let component: MercPendEntregarDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<MercPendEntregarDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
