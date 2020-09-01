import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarDetalleDesktopComponent } from './merc-pend-entregar-detalle-desktop.component';

describe('MercPendEntregarDetalleDesktopComponent', () => {
  let component: MercPendEntregarDetalleDesktopComponent;
  let fixture: ComponentFixture<MercPendEntregarDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
