import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosListaMovilComponent } from './contratos-lista-movil.component';

describe('ContratosListaMovilComponent', () => {
  let component: ContratosListaMovilComponent;
  let fixture: ComponentFixture<ContratosListaMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosListaMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosListaMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
