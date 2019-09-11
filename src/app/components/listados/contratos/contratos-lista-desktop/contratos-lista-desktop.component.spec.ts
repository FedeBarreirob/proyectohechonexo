import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosListaDesktopComponent } from './contratos-lista-desktop.component';

describe('ContratosListaDesktopComponent', () => {
  let component: ContratosListaDesktopComponent;
  let fixture: ComponentFixture<ContratosListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
