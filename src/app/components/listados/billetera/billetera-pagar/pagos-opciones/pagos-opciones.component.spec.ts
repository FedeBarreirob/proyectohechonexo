import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosOpcionesComponent } from './pagos-opciones.component';

describe('PagosOpcionesComponent', () => {
  let component: PagosOpcionesComponent;
  let fixture: ComponentFixture<PagosOpcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosOpcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
