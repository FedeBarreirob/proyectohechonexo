import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasHeaderItemDesktopComponent } from './ventas-header-item-desktop.component';

describe('VentasHeaderItemDesktopComponent', () => {
  let component: VentasHeaderItemDesktopComponent;
  let fixture: ComponentFixture<VentasHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
