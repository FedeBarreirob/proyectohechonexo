import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasListaDesktopComponent } from './ventas-lista-desktop.component';

describe('VentasListaDesktopComponent', () => {
  let component: VentasListaDesktopComponent;
  let fixture: ComponentFixture<VentasListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
