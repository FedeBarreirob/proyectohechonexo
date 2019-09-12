import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosResumenItemDesktopComponent } from './contratos-resumen-item-desktop.component';

describe('ContratosResumenItemDesktopComponent', () => {
  let component: ContratosResumenItemDesktopComponent;
  let fixture: ComponentFixture<ContratosResumenItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosResumenItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosResumenItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
