import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasDetalleDesktopComponent } from './entregas-detalle-desktop.component';

describe('EntregasDetalleDesktopComponent', () => {
  let component: EntregasDetalleDesktopComponent;
  let fixture: ComponentFixture<EntregasDetalleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasDetalleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasDetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
