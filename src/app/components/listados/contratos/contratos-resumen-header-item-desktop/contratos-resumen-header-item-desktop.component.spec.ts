import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosResumenHeaderItemDesktopComponent } from './contratos-resumen-header-item-desktop.component';

describe('ContratosResumenHeaderItemDesktopComponent', () => {
  let component: ContratosResumenHeaderItemDesktopComponent;
  let fixture: ComponentFixture<ContratosResumenHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosResumenHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosResumenHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
