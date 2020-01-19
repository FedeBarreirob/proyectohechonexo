import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosPendientesComponent } from './insumos-pendientes.component';

describe('InsumosPendientesComponent', () => {
  let component: InsumosPendientesComponent;
  let fixture: ComponentFixture<InsumosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsumosPendientesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
