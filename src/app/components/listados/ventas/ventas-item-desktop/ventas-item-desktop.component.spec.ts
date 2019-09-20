import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasItemDesktopComponent } from './ventas-item-desktop.component';

describe('VentasItemDesktopComponent', () => {
  let component: VentasItemDesktopComponent;
  let fixture: ComponentFixture<VentasItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
