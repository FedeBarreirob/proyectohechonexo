import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoDetalleDesktopComponent } from './contrato-detalle-desktop.component';

describe('ContratoDetalleDesktopComponent', () => {
  let component: ContratoDetalleDesktopComponent;
  let fixture: ComponentFixture<ContratoDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
