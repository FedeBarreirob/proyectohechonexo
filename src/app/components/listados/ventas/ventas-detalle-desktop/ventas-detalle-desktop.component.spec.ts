import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasDetalleDesktopComponent } from './ventas-detalle-desktop.component';

describe('VentasDetalleDesktopComponent', () => {
  let component: VentasDetalleDesktopComponent;
  let fixture: ComponentFixture<VentasDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
