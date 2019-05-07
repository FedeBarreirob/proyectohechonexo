import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosResumenItemMovilComponent } from './contratos-resumen-item-movil.component';

describe('ContratosResumenItemMovilComponent', () => {
  let component: ContratosResumenItemMovilComponent;
  let fixture: ComponentFixture<ContratosResumenItemMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosResumenItemMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosResumenItemMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
